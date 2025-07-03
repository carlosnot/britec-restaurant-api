import Database from "../config/Database";
import type { Order } from "../types/order";
import { dateFormatter, timeFormatter } from "../utils/dateFormatter";

export class OrderRepository {
  async create(tableId: number, employee: string): Promise<Order> {
    try {
      const now = new Date();

      const currentDate = dateFormatter.format(now).split("/").reverse().join("-");
      const currentTime = timeFormatter.format(now);

      const result = await Database.query(
        `
            INSERT INTO supermercado.a_pedido (
            nCartao,
            status,
            data,   
            hora,
            operador,
            nomeVendedor,
            taxaServico
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [tableId, 0, currentDate, currentTime, employee, " ", 0]
      );

      const insertedId = (result as any).insertId;

      if (!insertedId) {
        throw new Error("Failed to retrieve inserted order ID");
      }
      return {
        id: insertedId,
        tableId,
        status: 0,
        date: currentDate,
        hour: currentTime,
        employee,
      };
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to create a new Order.");
    }
  }

  async getById(orderId: number): Promise<Order[]> {
    try {
      const result = await Database.query(
        `
        SELECT
            nPedido as id,
            nCartao as tableId,
            status,
            data as date,   
            hora as hour,
            operador as employee
        FROM supermercado.a_pedido
        WHERE nPedido = ?
        AND status = 0            
        `,
        [orderId]
      );

      return result as Order[];
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to get Order by ID.");
    }
  }
}
