import { Order } from '@/entities/Order';
import { MongoOrder } from '@/database/mongodbModels';
import { iOrderRepository } from './iOrderRepository';
import { CreateOrderDto } from '../dto/createOrder.dto';
import { EditOrderDto } from '../dto/editOrderDto';
import { Product } from '@/entities/Product';

interface OrderListWithProducts {
  _id?: string;
  table: string;
  status?: string;
  products: { product: string | Product; quantity: number }[];
}
export class OrderRepository implements iOrderRepository {
  async create(dto: CreateOrderDto) {
    const newOrder = await MongoOrder.create(dto);
    return new Order({
      id: newOrder._id.toString(),
      table: newOrder.table,
      status: newOrder.status,
      products: newOrder.products.map(({ product, quantity }) => {
        return {
          product: product._id.toString(),
          quantity: quantity,
        };
      }),
    });
  }

  async findAll() {
    const orderList: OrderListWithProducts[] = await MongoOrder.find()
      .sort({ createdAt: 1 })
      .populate('products.product')
      .lean();

    const cleanedOrderList = orderList.map((order) => {
      return new Order({
        id: order._id?.toString(),
        table: order.table,
        status: order.status,
        products: order.products,
      });
    });

    return cleanedOrderList;
  }

  async edit(orderId: string, dto: EditOrderDto) {
    await MongoOrder.findByIdAndUpdate(orderId, {
      status: dto.status,
      table: dto.table,
      products: dto.products,
    });
  }

  async delete(orderId: string) {
    await MongoOrder.findByIdAndDelete(orderId);
  }
}
