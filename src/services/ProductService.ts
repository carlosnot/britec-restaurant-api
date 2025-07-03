import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../types/product";

export class ProductService {
  private readonly productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async getProductsBySection(sectionId: number): Promise<Product[]> {
    return this.productRepository.getBySection(sectionId);
  }
}
