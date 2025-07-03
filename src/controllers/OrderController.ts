import { FastifyRequest, FastifyReply } from "fastify";
import { OrderService } from "../services/OrderService";

export class OrderController {
  private readonly orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createNewOrder(request: FastifyRequest, reply: FastifyReply) {
    try {
      if (!request.body || typeof request.body !== "object") {
        return reply.status(400).send({ message: "Invalid request body" });
      }
      const { tableId, employee } = request.body as { tableId?: unknown; employee?: unknown };

      if (typeof tableId !== "number" || !Number.isInteger(tableId) || tableId <= 0) {
        return reply.status(400).send({
          message: "Invalid tableId. Must be a positive INTEGER",
        });
      }

      if (typeof employee !== "string") {
        return reply.status(400).send({
          message: "Invalid employee name. Must be a STRING",
        });
      }

      const newOrder = await this.orderService.createNewOrder(Number(tableId), employee.trim());

      return reply.status(201).send({
        success: true,
        order: newOrder,
        message: "Order created successfully",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }

  async getOrderById(request: FastifyRequest<{ Params: { orderId: number } }>, reply: FastifyReply) {
    try {
      const { orderId } = request.params;
      const order = await this.orderService.getOrderById(orderId);

      if (!order || order.length <= 0) {
        return reply.status(404).send({ message: "Order is closed or does not exist" });
      }

      return reply.send(order);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }
}
