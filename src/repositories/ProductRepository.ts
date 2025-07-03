import Database from "../config/Database";
import type { Product } from "../types/product";

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    try {
      const results = await Database.query(
        `
        SELECT 
            i.nInterno as id,
            i.CodigoBarra as barCode,
            i.Descricao as description,
            i.unvenda as unit,
            i.preco as price,
            i.CodGrupo as sectionId,
            g.Descricao as section
        FROM supermercado.itens i
        INNER JOIN supermercado.grupo g on i.CodGrupo = g.CodGrupo
        ORDER BY i.Descricao
        `
      );
      return results as Product[];
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to get all Products.");
    }
  }

  async getBySection(sectionId: number): Promise<Product[]> {
    try {
      const results = await Database.query(
        `
      SELECT 
            i.nInterno as id,
            i.CodigoBarra as barCode,
            i.Descricao as description,
            i.unvenda as unit,
            i.preco as price,
            i.CodGrupo as sectionId,
            g.Descricao as section
        FROM supermercado.itens i
        INNER JOIN supermercado.grupo g on i.CodGrupo = g.CodGrupo
        WHERE i.CodGrupo = ?
        ORDER BY i.Descricao
      `,
        [sectionId]
      );

      return results as Product[];
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to get all Products.");
    }
  }
}
