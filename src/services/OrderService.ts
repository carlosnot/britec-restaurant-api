import { OrderRepository } from "../repositories/OrderRepository";
import { Order } from "../types/order";

export class OrderService {
  private readonly orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createNewOrder(tableId: number, employee: string): Promise<Order> {
    return this.orderRepository.create(tableId, employee);
  }

  async getOrderById(orderId: number): Promise<Order[]> {
    return this.orderRepository.getById(orderId);
  }
}
