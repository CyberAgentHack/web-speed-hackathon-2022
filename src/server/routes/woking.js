// // import moment from "moment-timezone";
// import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

// import { assets } from "../../client/foundation/utils/UrlUtils.js";
// import { BettingTicket, Race, User } from "../../model/index.js";
// import { createConnection } from "../typeorm/connection.js";
// import { initialize } from "../typeorm/initialize.js";

// /**
//  * @type {import('fastify').FastifyPluginCallback}
//  */
// export const apiRoute = async (fastify) => {
//   fastify.get("/users/me", async (req, res) => {
//     const repo = (await createConnection()).getRepository(User);

//     if (req.user != null) {
//       res.send(req.user);
//     } else {
//       const user = await repo.save(new User());
//       res.send(user);
//     }
//   });

//   fastify.post("/users/me/charge", async (req, res) => {
//     if (req.user == null) {
//       throw fastify.httpErrors.unauthorized();
//     }

//     const { amount } = req.body;
//     if (typeof amount !== "number" || amount <= 0) {
//       throw fastify.httpErrors.badRequest();
//     }

//     const repo = (await createConnection()).getRepository(User);

//     req.user.balance += amount;
//     await repo.save(req.user);

//     res.status(204).send();
//   });

//   fastify.get("/hero", async (_req, res) => {
//     const url = assets("/images/hero.jpg");
//     const hash = '6666666666'

//     res.send({ hash, url });
//   });

//   fastify.get("/races", async (req, res) => {
//     const since =
//       req.query.since != null ? new Date(req.query.since*1000) : undefined;
//       // req.query.since != null ? moment.unix(req.query.since) : undefined;
//     const until =
//       req.query.until != null ? new Date(req.query.until*1000) : undefined;

//     if (since != null) {
//       throw fastify.httpErrors.badRequest();
//     }
//     if (until != null) {
//       throw fastify.httpErrors.badRequest();
//     }

//     const repo = (await createConnection()).getRepository(Race);

//     const formatUTCTime=(date)=>{
//       date=new Date(date)
//       return `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDay()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
//     }

//     const where = {};
//     if (since != null && until != null) {
//       Object.assign(where, {
//         startAt: Between(
//           formatUTCTime(since),
//           formatUTCTime(until),
//         ),
//       });
//     } else if (since != null) {
//       Object.assign(where, {
//         startAt: MoreThanOrEqual(formatUTCTime(since)),
//       });
//     } else if (until != null) {
//       Object.assign(where, {
//         startAt: LessThanOrEqual(formatUTCTime(until)),
//       });
//     }

//     const races = await repo.find({
//       where,
//     });

//     res.send({ races });
//   });

//   fastify.get("/races/:raceId", async (req, res) => {
//     const repo = (await createConnection()).getRepository(Race);

//     const race = await repo.findOne(req.params.raceId, {
//       relations: ["entries", "entries.player", "trifectaOdds"],
//     });

//     if (race === undefined) {
//       throw fastify.httpErrors.notFound();
//     }

//     res.send(race);
//   });

//   fastify.get("/races/:raceId/betting-tickets", async (req, res) => {
//     if (req.user == null) {
//       throw fastify.httpErrors.unauthorized();
//     }

//     const repo = (await createConnection()).getRepository(BettingTicket);
//     const bettingTickets = await repo.find({
//       where: {
//         race: {
//           id: req.params.raceId,
//         },
//         user: {
//           id: req.user.id,
//         },
//       },
//     });

//     res.send({
//       bettingTickets,
//     });
//   });

//   fastify.post("/races/:raceId/betting-tickets", async (req, res) => {
//     if (req.user == null) {
//       throw fastify.httpErrors.unauthorized();
//     }

//     if (req.user.balance < 100) {
//       throw fastify.httpErrors.preconditionFailed();
//     }

//     if (typeof req.body.type !== "string") {
//       throw fastify.httpErrors.badRequest();
//     }

//     if (
//       !Array.isArray(req.body.key) ||
//       req.body.key.some((n) => typeof n !== "number")
//     ) {
//       throw fastify.httpErrors.badRequest();
//     }

//     const bettingTicketRepo = (await createConnection()).getRepository(
//       BettingTicket,
//     );
//     const bettingTicket = await bettingTicketRepo.save(
//       new BettingTicket({
//         key: req.body.key,
//         race: {
//           id: req.params.raceId,
//         },
//         type: req.body.type,
//         user: {
//           id: req.user.id,
//         },
//       }),
//     );

//     const userRepo = (await createConnection()).getRepository(User);
//     req.user.balance -= 100;
//     await userRepo.save(req.user);

//     res.send(bettingTicket);
//   });

//   fastify.post("/initialize", async (_req, res) => {
//     await initialize();
//     res.status(204).send();
//   });
// };
