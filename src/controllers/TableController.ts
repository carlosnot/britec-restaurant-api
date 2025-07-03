import { FastifyRequest, FastifyReply } from "fastify";
import { TableService } from "../services/TableService";

export class TableController {
  private readonly tableService: TableService;

  constructor() {
    this.tableService = new TableService();
  }

  async getClosedTables(request: FastifyRequest, reply: FastifyReply) {
    try {
      const tables = await this.tableService.getClosedTables();

      if (!tables || tables.length === 0) {
        return reply.status(404).send({ message: "No closed tables found" });
      }

      return reply.status(200).send(tables);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }

  async getOpenedTables(request: FastifyRequest, reply: FastifyReply) {
    try {
      const tables = await this.tableService.getOpenedTables();

      if (!tables || tables.length === 0) {
        return reply.status(404).send({ message: "No opened tables found" });
      }

      return reply.status(200).send(tables);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }

  async checkTableStatusById(request: FastifyRequest<{ Params: { tableId: number } }>, reply: FastifyReply) {
    try {
      const { tableId } = request.params;

      const table = await this.tableService.checkTableStatusById(tableId);

      if (table === null) {
        return reply.status(404).send({ status: "null", message: "Table does not exist" });
      }

      return reply.status(200).send(table);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }
}
