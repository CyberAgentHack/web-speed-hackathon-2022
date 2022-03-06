import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import zenginCode from "zengin-code";

import { getUTCFormatString } from "../../client/foundation/utils/DateUtils";
import { assets } from "../../client/foundation/utils/UrlUtils.js";
import { BettingTicket, Race, User } from "../../model/index.js";
import { createConnection } from "../typeorm/connection.js";
import { initialize } from "../typeorm/initialize.js";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const apiRoute = async (fastify) => {
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
    const url = assets("/images/hero.avif");
    res.send({ url });
  });

  fastify.get("/races", async (req, res) => {
    const since = req.query.since ? new Date(req.query.since * 1000) : null;
    const until = req.query.until ? new Date(req.query.until * 1000) : null;

    const repo = (await createConnection()).getRepository(Race);

    const where = {};
    if (since != null && until != null) {
      Object.assign(where, {
        startAt: Between(getUTCFormatString(since), getUTCFormatString(until)),
      });
    } else if (since != null) {
      Object.assign(where, {
        startAt: MoreThanOrEqual(getUTCFormatString(since)),
      });
    } else if (until != null) {
      Object.assign(where, {
        startAt: LessThanOrEqual(getUTCFormatString(since)),
      });
    }

    const races = await repo.find({
      order: {
        startAt: "ASC",
      },
      where,
    });

    const newRaces = Array.from(races).map((race) => {
      const newFileName = race.image.replace(".jpg", ".avif");
      return { ...race, image: newFileName };
    });

    res.send({ races: newRaces });
  });

  fastify.get("/races/:raceId", async (req, res) => {
    const repo = (await createConnection()).getRepository(Race);

    const race = await repo.findOne(req.params.raceId, {
      relations: ["entries", "entries.player", "trifectaOdds"],
    });

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    const newRace = {
      ...race,
      entries: race.entries.map((entry) => {
        const newFileName = entry.player.image.replace(".jpg", ".avif");
        return { ...entry, player: { ...entry.player, image: newFileName } };
      }),
      image: race.image.replace(".jpg", ".avif"),
    };

    res.send(newRace);
  });

  fastify.get("/races/:raceId/entries", async (req, res) => {
    const repo = (await createConnection()).getRepository(Race);

    const race = await repo.findOne(req.params.raceId, {
      relations: ["entries", "entries.player"],
    });

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    const newRace = {
      ...race,
      entries: race.entries.map((entry) => {
        const newFileName = entry.player.image.replace(".jpg", ".avif");
        return { ...entry, player: { ...entry.player, image: newFileName } };
      }),
      image: race.image.replace(".jpg", ".avif"),
    };

    res.send(newRace);
  });

  fastify.get("/races/:raceId/trifectaOdds", async (req, res) => {
    const repo = (await createConnection()).getRepository(Race);

    const race = await repo.findOne(req.params.raceId, {
      relations: ["trifectaOdds"],
    });

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    res.send(race.trifectaOdds);
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

  fastify.get("/banks", async (_req, res) => {
    const banks = Object.keys(zenginCode).reduce((prev, curr) => {
      return [
        ...prev,
        { code: zenginCode[curr].code, name: zenginCode[curr].name },
      ];
    }, []);

    res.send({ banks });
  });

  fastify.get("/banks/:bankCode", async (req, res) => {
    const bankCode = req.params.bankCode;

    if (bankCode == null) {
      throw fastify.httpErrors.badRequest();
    }

    const targetBank = zenginCode[bankCode];

    res.send({ branches: targetBank.branches });
  });
};
