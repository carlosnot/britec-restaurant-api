import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController";

export async function productRoutes(fastify: FastifyInstance) {
  const productController = new ProductController();

  fastify.get("/products", productController.getAllProducts.bind(productController));
  fastify.get("/products/:sectionId", productController.getProductsBySection.bind(productController));
}
