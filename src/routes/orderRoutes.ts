import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/OrderController";

export async function orderRoutes(fastify: FastifyInstance) {
  const orderController = new OrderController();

  fastify.post("/orders", orderController.createNewOrder.bind(orderController));
  fastify.get("/orders/:orderId", orderController.getOrderById.bind(orderController));
}
