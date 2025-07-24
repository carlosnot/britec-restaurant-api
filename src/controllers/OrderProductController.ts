import { FastifyRequest, FastifyReply } from "fastify";
import { OrderProductService } from "../services/OrderProductService";

export class OrderProductController {
  private readonly orderProductService: OrderProductService;

  constructor() {
    this.orderProductService = new OrderProductService();
  }

  async getOrderProductsById(request: FastifyRequest<{ Params: { orderId: number } }>, reply: FastifyReply) {
    try {
      const { orderId } = request.params;
      const orderProducts = await this.orderProductService.getOrderProductsById(orderId);

      if (!orderProducts || orderProducts.length <= 0) {
        return reply.status(404).send({ message: "Order have not products" });
      }

      return reply.send(orderProducts);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }

  async createNewOrderProduct(request: FastifyRequest<{ Params: { orderId: number } }>, reply: FastifyReply) {
    try {
      if (!request.body || typeof request.body !== "object") {
        return reply.status(400).send({ message: "Invalid request body" });
      }
      const { orderId } = request.params;

      const { barCode, description, quantity, price, unit, employee } = request.body as {
        barCode: string;
        description: string;
        quantity: number;
        price: number;
        unit: string;
        employee: string;
      };

      const newOrder = await this.orderProductService.createNewOrderProduct(
        orderId,
        barCode,
        description,
        quantity,
        price,
        unit,
        employee
      );

      return reply.status(201).send({
        success: true,
        order: newOrder,
        message: "Order Product created successfully",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }

  async deleteOrderProductById(
    request: FastifyRequest<{ Params: { orderId: number; orderProductId: number } }>,
    reply: FastifyReply
  ) {
    try {
      const { orderId, orderProductId } = request.params;

      const wasDeleted = await this.orderProductService.deleteOrderProductById(orderId, orderProductId);

      if (!wasDeleted) {
        return reply.status(404).send({ message: "Product not found in order" });
      }

      return reply.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }

  async updateOrderProductById(
    request: FastifyRequest<{ Params: { orderId: number; orderProductId: number } }>,
    reply: FastifyReply
  ) {
    try {
      const { orderId, orderProductId } = request.params;
      const { quantity } = request.body as { quantity: number };

      const wasUpdated = await this.orderProductService.updateOrderProductById(orderId, orderProductId, quantity);

      if (!wasUpdated) {
        return reply.status(404).send({ message: "Product not found in order" });
      }

      return reply.status(200).send({ success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }

  async updatePrintedOrderProduct(
    request: FastifyRequest<{ Params: { orderId: number }; Body: { barCodes: string[] } }>,
    reply: FastifyReply
  ) {
    try {
      const { orderId } = request.params;
      const { barCodes } = request.body;

      if (!barCodes || !Array.isArray(barCodes)) {
        return reply.status(400).send({ message: "barCodes must be an array" });
      }

      const updated = await this.orderProductService.updatePrintedOrderProduct(barCodes, orderId);

      if (!updated) {
        return reply.status(404).send({ message: "No products were updated" });
      }

      return reply.send({ success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }
}
