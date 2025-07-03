import { FastifyRequest, FastifyReply } from "fastify";
import { ProductService } from "../services/ProductService";

export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async getAllProducts(request: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await this.productService.getAllProducts();

      if (!products || products.length === 0) {
        return reply.status(404).send({ message: "No products found" });
      }

      return reply.status(200).send(products);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }

  async getProductsBySection(request: FastifyRequest<{ Params: { sectionId: number } }>, reply: FastifyReply) {
    try {
      const { sectionId } = request.params;
      const products = await this.productService.getProductsBySection(sectionId);

      if (!products) {
        return reply.status(404).send({ message: "No products by section found" });
      }

      return reply.send(products);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }
}
