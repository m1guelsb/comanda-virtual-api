import { router } from '@/main';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repositories/OrderRepository';

export class OrderModule {
  instantiate() {
    const repository = new OrderRepository();
    const service = new OrderService(repository);
    const controller = new OrderController(service);

    router.post('/orders', (req, res) => controller.createOrder(req, res));

    router.get('/orders', (req, res) => controller.listOrders(req, res));

    router.patch('/orders/:orderId', (req, res) =>
      controller.editOrder(req, res)
    );

    router.delete('/orders/:orderId', (req, res) =>
      controller.cancelOrder(req, res)
    );
  }
}
