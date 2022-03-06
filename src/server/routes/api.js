import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import zenginCode from "zengin-code";

import { BettingTicket, OddsItem, Race, User } from "../../model/index.js";
import { initialize } from "../typeorm/initialize.js";

dayjs.extend(utc);

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const unAuthApiRoute = async (fastify) => {
  fastify.get("/bank/list", async (req, res) => {
    const bankList = Object.values(zenginCode).map(({ code, name }) => ({
      code,
      name,
    }));

    res.send({ bankList });
  });

  fastify.get("/bank/:bankId", async (req, res) => {
    const bank = zenginCode[req.params.bankId];
    res.send({ bank });
  });

  // fastify.get("/hero", async (_req, res) => {
  //   const url = assets("/images/hero.webp");
  //   const hash = Math.random().toFixed(10).substring(2);

  //   res.send({ hash, url });
  // });

  fastify.get("/races", async (req, res) => {
    const since =
      req.query.since != null ? dayjs.unix(req.query.since) : undefined;
    const until =
      req.query.until != null ? dayjs.unix(req.query.until) : undefined;
    const limit =
      req.query.limit != null ? parseInt(req.query.limit, 10) : undefined;
    const offset =
      req.query.offset != null ? parseInt(req.query.offset, 10) : 0;

    if (since != null && !since.isValid()) {
      throw fastify.httpErrors.badRequest();
    }
    if (until != null && !until.isValid()) {
      throw fastify.httpErrors.badRequest();
    }
    if (Number.isNaN(offset)) {
      throw fastify.httpErrors.badRequest();
    }

    const repo = req.dbConnection.getRepository(Race);

    const where = {};
    if (since != null && until != null) {
      Object.assign(where, {
        startAt: Between(
          since.utc().format("YYYY-MM-DD HH:mm:ss"),
          until.utc().format("YYYY-MM-DD HH:mm:ss"),
        ),
      });
    } else if (since != null) {
      Object.assign(where, {
        startAt: MoreThanOrEqual(since.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    } else if (until != null) {
      Object.assign(where, {
        startAt: LessThanOrEqual(until.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    }

    const races = await repo.find({
      order: {
        startAt: "ASC",
      },
      skip: offset,
      take: limit,
      where,
    });

    res.send({ races });
  });

  fastify.get("/races/:raceId", async (req, res) => {
    const repo = req.dbConnection.getRepository(Race);

    const race = await repo.findOne(req.params.raceId, {
      // relations: ["entries", "entries.player", "trifectaOdds"],
      relations: ["entries", "entries.player"],
    });

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    res.send(race);
  });

  fastify.get("/races/:raceId/first/:firstKey", async (req, res) => {
    const repo = req.dbConnection.getRepository(OddsItem);
    const odds = await repo.find({
      join: { alias: "odds2", innerJoin: { race: "odds2.race" } },
      order: {
        odds: "ASC",
      },
      select: ["key", "odds"],
      where: (qb) => {
        qb.where("race.id = :raceId", { raceId: req.params.raceId });
      },
    });

    if (odds === undefined) {
      throw fastify.httpErrors.notFound();
    }

    const filteredOdds = odds.filter(
      ({ key }) => key[0] === parseInt(req.params.firstKey, 10),
    );

    const converted = filteredOdds.reduce((acc, cur) => {
      const [, second, third] = cur.key;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      acc[`${second}.${third}`] = cur;
      return acc;
    }, {});

    res.send(converted);
  });

  fastify.get("/races/:raceId/popular", async (req, reply) => {
    const repo = req.dbConnection.getRepository(OddsItem);
    const odds = await repo.find({
      join: { alias: "odds2", innerJoin: { race: "odds2.race" } },
      order: {
        odds: "ASC",
      },
      take: 50,
      where: (qb) => {
        qb.where("race.id = :raceId", { raceId: req.params.raceId });
      },
    });

    if (odds === undefined) {
      throw fastify.httpErrors.notFound();
    }

    const res = odds.map(({ key, odds }) => ({ key, odds }));

    reply.send(res);
  });

  fastify.post("/initialize", async (_req, res) => {
    await initialize();
    res.status(204).send();
  });
};

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const authApiRoute = async (fastify) => {
  fastify.addHook("onRequest", async (req, res) => {
    const repo = req.dbConnection.getRepository(User);

    const userId = req.headers["x-app-userid"];
    if (userId !== undefined) {
      const user = await repo.findOne(userId);
      if (user === undefined) {
        res.unauthorized();
        return;
      }
      req.user = user;
    }
  });

  fastify.get("/users/me", async (req, res) => {
    const repo = req.dbConnection.getRepository(User);

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

    const repo = req.dbConnection.getRepository(User);

    req.user.balance += amount;
    await repo.save(req.user);

    res.status(204).send();
  });

  fastify.get("/races/:raceId/betting-tickets", async (req, res) => {
    if (req.user == null) {
      throw fastify.httpErrors.unauthorized();
    }

    const repo = req.dbConnection.getRepository(BettingTicket);
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

    const bettingTicketRepo = req.dbConnection.getRepository(BettingTicket);
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

    const userRepo = req.dbConnection.getRepository(User);
    req.user.balance -= 100;
    await userRepo.save(req.user);

    res.send(bettingTicket);
  });
};
