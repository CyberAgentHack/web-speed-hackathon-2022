import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

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
    const selectStmt = c.env.DB.prepare("select * from user where id=?").bind(
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

export default app;
