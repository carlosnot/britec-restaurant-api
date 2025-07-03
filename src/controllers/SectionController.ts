import { FastifyRequest, FastifyReply } from "fastify";
import { SectionService } from "../services/SectionService";

export class SectionController {
  private readonly sectionService: SectionService;

  constructor() {
    this.sectionService = new SectionService();
  }

  async getAllSections(request: FastifyRequest, reply: FastifyReply) {
    try {
      const sections = await this.sectionService.getAllSections();

      if (!sections || sections.length === 0) {
        return reply.status(404).send({ message: "No sections found" });
      }

      return reply.status(200).send(sections);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }
}
