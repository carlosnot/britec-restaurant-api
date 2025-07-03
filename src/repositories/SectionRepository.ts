import Database from "../config/Database";
import type { Section } from "../types/section";

export class SectionRepository {
  async getAll(): Promise<Section[]> {
    try {
      const results = await Database.query(
        `
           SELECT 
              CodGrupo as id,
              CONCAT(
                UPPER(SUBSTRING(Descricao, 1, 1)),
                LOWER(SUBSTRING(Descricao, 2))
              ) as description
           FROM supermercado.grupo
           `
      );
      return results as Section[];
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to get all Sections.");
    }
  }
}
