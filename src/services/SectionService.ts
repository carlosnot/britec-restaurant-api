import { SectionRepository } from "../repositories/SectionRepository";
import { Section } from "../types/section";

export class SectionService {
  private readonly sectionRepository: SectionRepository;

  constructor() {
    this.sectionRepository = new SectionRepository();
  }

  async getAllSections(): Promise<Section[]> {
    return this.sectionRepository.getAll();
  }
}
