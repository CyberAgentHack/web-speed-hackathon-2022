import dayjs from "dayjs";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import zenginCode from "zengin-code";

import { BettingTicket, OddsItem, Race, RaceEntry, User } from "../../model";
import { createConnection } from "../typeorm/connection";
import { initialize } from "../typeorm/initialize";

/**
 * @type {import("fastify").FastifyPluginCallback}
 */
export const apiRoute = async (fastify) => {
  fastify.get("/zengin-code", async (_req, res) => {
    const bankData = {};
    Object.entries(zenginCode).forEach(([code, { branches, name }]) => {
      const branchData = {};
      Object.entries(branches).forEach(([code, { name }]) => {
        branchData[code] = { code, name };
      });

      bankData[code] = {
        branches: branchData,
        code,
        name,
      };
    });

    return res.send(bankData);
  });

  fastify.get("/users/me", async (req, res) => {
    const repo = (await createConnection()).getRepository(User);

    if (req.user != null) {
      return res.send(req.user);
    } else {
      const user = await repo.save(new User());
      return res.send(user);
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

  /**
   @param {import("fastify").FastifyRequest} req
   @param {import("fastify").FastifyReply} res
   */
  fastify.get("/races", async (req, res) => {
    const since = req.query.since != null ? dayjs.unix(req.query.since) : undefined;
    const until = req.query.until != null ? dayjs.unix(req.query.until) : undefined;

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
    } else if (since != null) {
      Object.assign(where, {
        startAt: MoreThanOrEqual(since.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    } else if (until != null) {
      Object.assign(where, {
        startAt: LessThanOrEqual(until.utc().format("YYYY-MM-DD HH:mm:ss")),
      });
    }

    const order = {
      "startAt": 1,
    };

    const races = await repo.find({
      order,
      where,
    });

    return res.send({
      items: races,
    });
  });

  fastify.get("/races/:raceId", async (req, res) => {
    const repo = (await createConnection()).getRepository(Race);

    const race = await repo.findOne(req.params.raceId);

    if (race === undefined) {
      throw fastify.httpErrors.notFound();
    }

    return res.send(race);
  });

  fastify.get("/races/:raceId/entries", async (req, res) => {
    const repo = (await createConnection()).getRepository(RaceEntry);

    const entries = await repo.find({
      relations: ["player"],
      where: {
        race: {
          id: req.params.raceId,
        },
      },
    });

    return res.send({
      items: entries
    });
  });

  fastify.get("/races/:raceId/trifectaOdds", async (req, res) => {
    const repo = (await createConnection()).getRepository(OddsItem);
    const odds = await repo.find({
      select: [
        "key",
        "odds",
      ],
      where: {
        race: {
          id: req.params.raceId,
        },
      },
    });

    return res.send({
      items: odds,
    });
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

    return res.send({
      items: bettingTickets,
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

    return res.send(bettingTicket);
  });

  fastify.post("/initialize", async (_req, res) => {
    await initialize();
    res.status(204).send();
  });
};
