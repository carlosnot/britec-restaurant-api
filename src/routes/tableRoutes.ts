import { FastifyInstance } from "fastify";
import { TableController } from "../controllers/TableController";

export async function tableRoutes(fastify: FastifyInstance) {
  const tableController = new TableController();

  fastify.get("/tables/closed", tableController.getClosedTables.bind(tableController));
  fastify.get("/tables/opened", tableController.getOpenedTables.bind(tableController));
  fastify.get("/tables/check/:tableId", tableController.checkTableStatusById.bind(tableController));
}
