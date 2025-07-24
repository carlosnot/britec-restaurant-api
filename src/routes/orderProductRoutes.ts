import { FastifyInstance } from "fastify";
import { OrderProductController } from "../controllers/OrderProductController";

export async function orderProductRoutes(fastify: FastifyInstance) {
  const orderProductController = new OrderProductController();

  fastify.post("/orders/:orderId/products", orderProductController.createNewOrderProduct.bind(orderProductController));
  fastify.get("/orders/:orderId/products", orderProductController.getOrderProductsById.bind(orderProductController));
  fastify.delete(
    "/orders/:orderId/products/:orderProductId",
    orderProductController.deleteOrderProductById.bind(orderProductController)
  );
  fastify.put(
    "/orders/:orderId/products/:orderProductId",
    orderProductController.updateOrderProductById.bind(orderProductController)
  );
  fastify.put(
    "/orders/:orderId/products/print",
    orderProductController.updatePrintedOrderProduct.bind(orderProductController)
  );
}
