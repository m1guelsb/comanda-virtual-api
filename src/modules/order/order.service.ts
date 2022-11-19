import { CreateOrderDto } from './dto/createOrder.dto';
import { EditOrderDto } from './dto/editOrderDto';
import { iOrderRepository } from './repositories/iOrderRepository';

export class OrderService {
  constructor(private iOderRepository: iOrderRepository) {}
  async createOrder(dto: CreateOrderDto) {
    return this.iOderRepository.create(dto);
  }

  async listOrders() {
    return this.iOderRepository.findAll();
  }

  async editOrder(orderId: string, dto: EditOrderDto) {
    return this.iOderRepository.edit(orderId, dto);
  }

  async cancelOrder(orderId: string) {
    return this.iOderRepository.delete(orderId);
  }
}
