import Database from "../config/Database";
import type { Table } from "../types/table";

export class TableRepository {
  async getClosed(): Promise<Table[]> {
    try {
      const results = await Database.query(
        `
        SELECT 
          c.nCartao as id,
          'closed' as status
        FROM supermercado.a_cartao c
        LEFT JOIN supermercado.a_pedido p ON c.nCartao = p.nCartao AND p.status = 0
        WHERE p.nCartao IS NULL
        ORDER BY round(c.nCartao)
        `
      );
      return results as Table[];
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to get closed Tables.");
    }
  }

  async getOpened(): Promise<Table[]> {
    try {
      const results = await Database.query(
        `
        SELECT DISTINCT
          c.nCartao as id,
          p.nPedido as orderId,
          'opened' as status
        FROM supermercado.a_cartao c
        INNER JOIN supermercado.a_pedido p ON c.nCartao = p.nCartao
        WHERE p.status = 0
        ORDER BY round(c.nCartao)
        `
      );

      return results as Table[];
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to get opened Tables.");
    }
  }

  async checkStatusById(tableId: number): Promise<Table[] | null> {
    try {
      const [openedResult] = await Database.query(
        `
            SELECT 
                c.nCartao as id,
                p.nPedido as orderId,
                'opened' as status
            FROM supermercado.a_cartao c
            INNER JOIN supermercado.a_pedido p ON c.nCartao = p.nCartao
            WHERE c.nCartao = ? AND p.status = 0
            LIMIT 1
            `,
        [tableId]
      );

      if (openedResult) {
        return openedResult as Table[];
      }

      const [tableExists] = await Database.query(
        `
            SELECT 
                nCartao as id,
                'closed' as status
            FROM supermercado.a_cartao
            WHERE nCartao = ?
            LIMIT 1
            `,
        [tableId]
      );

      return tableExists ? (tableExists as Table[]) : null;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to check table status");
    }
  }
}
