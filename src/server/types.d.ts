import "fastify";
import "typeorm";

declare module "fastify" {
  interface FastifyRequest {
    user: Model.User | null;
    dbConnection: Connection;
  }
}
