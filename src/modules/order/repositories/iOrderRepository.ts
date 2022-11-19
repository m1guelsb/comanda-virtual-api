import { Order } from '@/entities/Order';
import { CreateOrderDto } from '../dto/createOrder.dto';
import { EditOrderDto } from '../dto/editOrderDto';

export interface iOrderRepository {
  create: (dto: CreateOrderDto) => Promise<Order>;

  findAll: () => Promise<Order[]>;

  edit: (productId: string, dto: EditOrderDto) => Promise<void>;

  delete: (productId: string) => Promise<void>;
}
