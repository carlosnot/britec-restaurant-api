export interface OrderProduct {
  id: number;
  orderId: number;
  barCode: string;
  description: string;
  quantity: number;
  price: number;
  unit: string;
  employee: string;
}
