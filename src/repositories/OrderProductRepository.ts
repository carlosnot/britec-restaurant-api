import Database from "../config/Database";
import type { OrderProduct } from "../types/orderProduct";

export class OrderProductRepository {
  async getById(orderId: number): Promise<OrderProduct[]> {
    try {
      const results = await Database.query(
        `
        SELECT
            nReg as id,
            nPedido as orderId,
            CodigoBarras as barCode,
            Descricao as description,
            qtd as quantity,
            preco as price,
            und as unit,
            atendente as employee,
            Impresso as printed
        FROM supermercado.a_pedidoproduto
        WHERE nPedido = ?
        `,
        [orderId]
      );

      return results as OrderProduct[];
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to get all Products from Order.");
    }
  }

  async create(
    orderId: number,
    barCode: string,
    description: string,
    quantity: number,
    price: number,
    unit: string,
    employee: string
  ): Promise<OrderProduct> {
    try {
      const result = await Database.query(
        `
            INSERT INTO supermercado.a_pedidoproduto (
            nPedido,
            CodigoBarras,
            Descricao,
            qtd,
            preco,
            und,
            obs,
            atendente
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [orderId, barCode, description, quantity, price, unit, " ", employee]
      );

      const insertedId = (result as any).insertId;

      if (!insertedId) {
        throw new Error("Failed to retrieve inserted order product ID");
      }

      return {
        id: insertedId,
        orderId,
        barCode,
        description,
        quantity,
        price,
        unit,
        employee,
        printed: 0,
      };
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to create a new Order Product.");
    }
  }

  async deleteById(orderId: number, orderProductId: number): Promise<boolean> {
    try {
      const result = await Database.query(
        `
          DELETE FROM supermercado.a_pedidoproduto
          WHERE nPedido = ? AND nReg = ?
        `,
        [orderId, orderProductId]
      );

      const wasDeleted = (result as any).affectedRows > 0;

      return wasDeleted;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to delete Products from Order.");
    }
  }

  async updateById(orderId: number, orderProductId: number, quantity: number): Promise<boolean> {
    try {
      const result = await Database.query(
        `
        UPDATE supermercado.a_pedidoproduto
        SET qtd = ?
        WHERE nPedido = ? AND nReg = ?
        `,
        [quantity, orderId, orderProductId]
      );

      const wasUpdated = (result as any).affectedRows > 0;

      return wasUpdated;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to update Products from Order.");
    }
  }

  async getPrinterCod(barCode: string): Promise<number> {
    try {
      const result = await Database.query(
        ` SELECT codImpressora 
          FROM supermercado.itensimpressora
          WHERE codigobarra = ?
        `,
        [barCode]
      );

      if (Array.isArray(result) && result.length > 0) {
        return result[0].codImpressora || 0;
      }
      return 0;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to get Printer Cod.");
    }
  }

  async updatePrinted(barCodes: string[], orderId: number): Promise<boolean> {
    try {
      let anyUpdated = false;

      for (const barCode of barCodes) {
        const printerCod = await this.getPrinterCod(barCode);

        if (printerCod === 0) {
          continue;
        }

        const result = await Database.query(
          `
        UPDATE supermercado.a_pedidoproduto
        SET impresso = 1,
           codImpressora = ?
        WHERE CodigoBarras = ?    
        AND nPedido = ?
        AND impresso = 0
        `,
          [printerCod, barCode, orderId]
        );

        if ((result as any).affectedRows > 0) {
          anyUpdated = true;
        }
      }

      return anyUpdated;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to update Printed Status Product.");
    }
  }
}
