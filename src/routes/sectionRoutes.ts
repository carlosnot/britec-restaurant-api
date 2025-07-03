import { FastifyInstance } from "fastify";
import { SectionController } from "../controllers/SectionController";

export async function sectionRoutes(fastify: FastifyInstance) {
  const sectionController = new SectionController();

  fastify.get("/sections", sectionController.getAllSections.bind(sectionController));
}
