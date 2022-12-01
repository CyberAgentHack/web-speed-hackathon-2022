import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

dayjs.extend(utc);

type Env = {
  DB: D1Database;
};

type User = {
  id: string;
  payoff: number;
  balance: number;
};

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", cors({ origin: "*" }));
app.use("*", prettyJSON());

app.use("/api/*", async (c, next) => {
  c.header("Cache-Control", "private, no-store");
  await next();
});

app.use("/api/*", async (c, next) => {
  const userId = c.req.header("x-app-userid");
  if (userId !== undefined) {
    const stmt = c.env.DB.prepare("select * from user where id=?").bind(userId);
    const user = await stmt.first();
    if (user === undefined) {
      return c.json({ message: "Unauthorized", ok: false }, 401);
    } else {
      c.set("user", user);
    }
  }
  await next();
});

app.get("/api/users/me", async (c) => {
  const user = c.get("user");
  if (user !== undefined) {
    return c.json(user);
  } else {
    const uuid = crypto.randomUUID();
    const insertStmt = c.env.DB.prepare(
      "insert into user (id) values (?)",
    ).bind(uuid);
    await insertStmt.run();
    const selectStmt = c.env.DB.prepare("select * from user where id = ?").bind(
      uuid,
    );
    const user = await selectStmt.first();
    return c.json(user);
  }
});

app.post("/api/users/charge", async (c) => {
  const user = c.get<User>("user");
  if (user === undefined) {
    return c.json({ message: "Unauthorized", ok: false }, 401);
  }

  const { amount } = await c.req.json<{ amount: number }>();
  if (typeof amount !== "number" || amount <= 0) {
    return c.json({ message: "Bad Request", ok: false }, 400);
  }

  const newBalance = user.balance + amount;
  const stmt = c.env.DB.prepare(
    "update user set balance = ? where id = ?",
  ).bind(newBalance, user.id);
  await stmt.run();
  return new Response(null, { status: 204 });
});

app.get("/api/races", async (c) => {
  const query = c.req.query();
  const since = query.since != null ? dayjs.unix(Number(query.since)) : null;
  const until = query.until != null ? dayjs.unix(Number(query.until)) : null;

  if (
    (since !== null && !since.isValid()) ||
    (until !== null && !until.isValid())
  ) {
    return c.json({ message: "Bad Request", ok: false }, 400);
  }

  let stmt = null;
  if (since !== null && until !== null) {
    stmt = c.env.DB.prepare(
      "select * from race where startAt between ? and ? order by startAt asc",
    ).bind(
      since.utc().format("YYYY-MM-DD HH:mm:ss"),
      until.utc().format("YYYY-MM-DD HH:mm:ss"),
    );
  } else {
    stmt = c.env.DB.prepare("select * from race order by startAt asc");
  }

  const { results } = await stmt.all();
  return c.json({ races: results });
});

app.get("/api/races/:raceId/betting-tickets", async (c) => {
  const user = c.get<User>("user");
  if (user === undefined) {
    return c.json({ message: "Unauthorized", ok: false }, 401);
  }

  const stmt = c.env.DB.prepare(
    "select * from betting_ticket where raceId = ? and userId = ?",
  ).bind(c.req.param().raceId, user.id);
  const { results } = await stmt.all();
  return c.json({ bettingTickets: results });
});

app.post("/api/races/:raceId/betting-tickets", async (c) => {
  const user = c.get<User>("user");
  if (user === undefined) {
    return c.json({ message: "Unauthorized", ok: false }, 401);
  }

  if (user.balance < 100) {
    return c.json({ message: "Precondition Failed", ok: false }, 412);
  }

  const { type, key } = await c.req.json<{ type: string; key: number[] }>();
  if (
    typeof type !== "string" ||
    !Array.isArray(key) ||
    key.some((n) => typeof n !== "number")
  ) {
    return c.json({ message: "Bad Request", ok: false }, 400);
  }

  const uuid = crypto.randomUUID();
  const insertStmt = c.env.DB.prepare(
    "insert into betting_ticket (id, key, type) values (?, ?) where raceId = ? and userId = ?",
  ).bind(uuid, JSON.stringify(key), type, c.req.param().raceId, user.id);
  await insertStmt.run();

  const newBalance = user.balance - 100;
  const updateStmt = c.env.DB.prepare(
    "update user set balance = ? where id = ?",
  ).bind(newBalance, user.id);
  await updateStmt.run();

  const selectStmt = c.env.DB.prepare(
    "select * from betting_ticket where id = ?",
  ).bind(uuid);
  const bettingTicket = await selectStmt.first();

  return c.json(bettingTicket);
});

export default app;
