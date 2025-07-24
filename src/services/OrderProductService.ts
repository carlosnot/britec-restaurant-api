import { OrderProductRepository } from "../repositories/OrderProductRepository";
import { OrderProduct } from "../types/orderProduct";

export class OrderProductService {
  private readonly orderProductRepository: OrderProductRepository;

  constructor() {
    this.orderProductRepository = new OrderProductRepository();
  }

  async getOrderProductsById(orderId: number): Promise<OrderProduct[]> {
    return this.orderProductRepository.getById(orderId);
  }

  async createNewOrderProduct(
    orderId: number,
    barCode: string,
    description: string,
    quantity: number,
    price: number,
    unit: string,
    employee: string
  ): Promise<OrderProduct> {
    return this.orderProductRepository.create(orderId, barCode, description, quantity, price, unit, employee);
  }

  async deleteOrderProductById(orderId: number, orderProductId: number): Promise<boolean> {
    return this.orderProductRepository.deleteById(orderId, orderProductId);
  }

  async updateOrderProductById(orderId: number, orderProductId: number, quantity: number): Promise<boolean> {
    return this.orderProductRepository.updateById(orderId, orderProductId, quantity);
  }

  async updatePrintedOrderProduct(barCodes: string[], orderId: number): Promise<boolean> {
    return this.orderProductRepository.updatePrinted(barCodes, orderId);
  }
}
