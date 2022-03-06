import { formatRFC7231, fromUnixTime } from "date-fns";
import fastifyCompress from "fastify-compress";
import fastifyCors from "fastify-cors";
import moment from "moment-timezone";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import zenginData from "zengin-code";

import { assets } from "../../client/foundation/utils/UrlUtils.js";
import { BettingTicket, OddsItem, Race, User } from "../../model/index.js";
import { createConnection } from "../typeorm/connection.js";
import { initialize } from "../typeorm/initialize.js";


const zenginMinifiedData = {};

Object.values(zenginData).forEach(bank => {
  const branches = {};

  Object.values(bank.branches).forEach(branch => {
    branches[branch.code] = {
      code: branch.code,
      name: branch.name
    }
  })

  zenginMinifiedData[bank.code] = {
    branches,
    code: bank.code,
    name: bank.name
  }
})

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const apiRoute = async (fastify) => {
  fastify.register(fastifyCors, {
    origin: ["https://wsh-2022-cathiecode.tk", "https://wsh-2022-cathiecode.herokuapp.com", "http://localhost:3000"]
  });

  fastify.register(
    fastifyCompress,
    { threshold: 2048 }
  )

  fastify.addHook("onRequest", async (req, res) => {
    res.header("Cache-Control", "no-cache, no-store");
  });

  fastify.get("/users/me", async (req, res) => {
    const repo = (await createConnection()).getRepository(User);

    if (req.user != null) {
      res.send(req.user);
    } else {
      const user = await repo.save(new User());
      res.send(user);
    }
  });

  fastify.post("/users/me/charge", async (req, res) => {
    if (req.user == null) {
      throw fastify.httpErrors.unauthorized();
    }

    const { amount } = req.body;
    if (typeof amount !== "number" || amount <= 0) {
      throw fastify.httpErrors.badRequest();
    }

    const repo = (await createConnection()).getRepository(User);

    req.user.balance += amount;
    await repo.save(req.user);

    res.status(204).send();
  });

  fastify.get("/hero", async (_req, res) => {
    const url = assets("/images/hero.jpg");
    const hash = Math.random().toFixed(10).substring(2);

    res.send({ hash, url });
  });

  fastify.get("/races", async (req, res) => {
    res.header("Cache-Control", "public");
    const since =
      req.query.since != null ? moment.unix(req.query.since) : undefined;
    const until =
      req.query.until != null ? moment.unix(req.query.until) : undefined;

    if (since != null && !since.isValid()) {
      throw fastify.httpErrors.badRequest();
    }
    if (until != null && !until.isValid()) {
      throw fastify.httpErrors.badRequest();
    }

    const repo = (await createConnection()).getRepository(Race);

    const where = {};
    if (since != null && until != null) {
      Object.assign(where, {
        startAt: Between(
          since.utc().format("YYYY-MM-DD HH:mm:ss"),
          until.utc().format("YYYY-MM-DD HH:mm:ss"),
        ),
      });
      res.header("Expires", formatRFC7231(fromUnixTime(parseInt(req.query.until))));
    } else if (since != null) {
      Object.assign(where, {
        startAt: MoreThanOrEqual(since.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    } else if (until != null) {
      res.header("Expires", formatRFC7231(fromUnixTime(parseInt(req.query.until))));
      Object.assign(where, {
        startAt: LessThanOrEqual(until.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    }

    const races = await repo.find({
      where,
    });

    res.send({ races });
  });

  fastify.get("/races/:raceId", async (req, res) => {
    const repo = (await createConnection()).getRepository(Race);

    const race = await repo.findOne(req.params.raceId, {
      relations: ["entries", "entries.player", "trifectaOdds"],
    });

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    res.send(race);
  });

  fastify.get("/races/:raceId/subset", async (req, res) => {
    const repo = (await createConnection()).getRepository(Race);

    const race = await repo.findOne(req.params.raceId, {
      relations: ["entries", "entries.player"],
    });

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    res.send(race);
  });

  fastify.get("/races/:raceId/odds_popular", async (req, res) => {
    const repo = (await createConnection()).getRepository(Race);

    const odds = (await repo.findOne(req.params.raceId, {
      relations: ["entries", "entries.player", "trifectaOdds"],
    }))?.trifectaOdds;

    if (odds === undefined) {
      throw fastify.httpErrors.notFound();
    }

    const sortedOdds = (() => {
      const sorted = [...odds].sort((a, b) => a.odds - b.odds);
      return sorted.slice(0, req.params["count"] !== undefined ? parseInt(req.params["count"]) : 50);
    })()

    res.send(sortedOdds);
  });

  const mapKey = (second, third) => `${second}.${third}`;

  fastify.get("/races/:raceId/odds_map/:firstKey", async (req, res) => {
    const repo = (await createConnection()).getRepository(OddsItem);

    const odds = await repo.find({
      race: req.params["raceId"]
    });

    if (odds === undefined) {
      throw fastify.httpErrors.notFound();
    }

    const firstKey = parseInt(req.params["firstKey"]);
    const filteredOdds = odds.filter((item) => item.key[0] === firstKey);

    const oddsMap = filteredOdds.reduce((acc, cur) => {
      const [, second, third] = cur.key;
      acc[mapKey(second, third)] = cur;
      return acc;
    }, {});

    res.send(oddsMap);
  });

  fastify.get("/races/:raceId/betting-tickets", async (req, res) => {
    if (req.user == null) {
      throw fastify.httpErrors.unauthorized();
    }

    const repo = (await createConnection()).getRepository(BettingTicket);
    const bettingTickets = await repo.find({
      where: {
        race: {
          id: req.params.raceId,
        },
        user: {
          id: req.user.id,
        },
      },
    });

    res.send({
      bettingTickets,
    });
  });

  fastify.post("/races/:raceId/betting-tickets", async (req, res) => {
    if (req.user == null) {
      throw fastify.httpErrors.unauthorized();
    }

    if (req.user.balance < 100) {
      throw fastify.httpErrors.preconditionFailed();
    }

    if (typeof req.body.type !== "string") {
      throw fastify.httpErrors.badRequest();
    }

    if (
      !Array.isArray(req.body.key) ||
      req.body.key.some((n) => typeof n !== "number")
    ) {
      throw fastify.httpErrors.badRequest();
    }

    const bettingTicketRepo = (await createConnection()).getRepository(
      BettingTicket,
    );
    const bettingTicket = await bettingTicketRepo.save(
      new BettingTicket({
        key: req.body.key,
        race: {
          id: req.params.raceId,
        },
        type: req.body.type,
        user: {
          id: req.user.id,
        },
      }),
    );

    const userRepo = (await createConnection()).getRepository(User);
    req.user.balance -= 100;
    await userRepo.save(req.user);

    res.send(bettingTicket);
  });

  fastify.post("/initialize", async (_req, res) => {
    await initialize();
    res.status(204).send();
  });

  fastify.get("/zengin-data", async (_req, res) => {
    res.header("Cache-Control", "max-age=86400, immutable");
    res.send(zenginMinifiedData);
  })
};
