import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user: Model.User | null;
  }
}
