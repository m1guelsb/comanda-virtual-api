import { HttpResponse } from '@/helpers/httpResponse';
import { Request, Response } from 'express';
import { CreateOrderDto } from './dto/createOrder.dto';
import { EditOrderDto } from './dto/editOrderDto';
import { OrderService } from './order.service';

export class OrderController {
  constructor(private orderService: OrderService) {}

  async createOrder(
    req: Request<unknown, unknown, CreateOrderDto>,
    res: Response
  ) {
    const { status, products, table } = req.body;

    if (!table) new HttpResponse().badRequest(res, 'table is required');
    if (!products) new HttpResponse().badRequest(res, 'products is required');

    products.map(({ product }) => {
      if (!product)
        new HttpResponse().badRequest(
          res,
          'field product in: { products: [{ PRODUCT: string }]} is required'
        );
    });

    try {
      const newOrder = await this.orderService.createOrder({
        status,
        products,
        table,
      });

      new HttpResponse().ok(res, newOrder);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }

  async listOrders(req: Request, res: Response) {
    try {
      const ordersList = await this.orderService.listOrders();

      new HttpResponse().ok(res, ordersList);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }

  async editOrder(
    req: Request<{ orderId: string }, unknown, EditOrderDto>,
    res: Response
  ) {
    const { orderId } = req.params;
    const { status, products, table } = req.body;

    if (status && !['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status))
      return new HttpResponse().badRequest(
        res,
        'status should be one of: "WAITING" "IN_PRODUCTION" "DONE"'
      );

    try {
      await this.orderService.editOrder(orderId, {
        products,
        status,
        table,
      });

      new HttpResponse().ok(res, {}, 204);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }

  async cancelOrder(
    req: Request<{ orderId: string }, unknown, unknown>,
    res: Response
  ) {
    const { orderId } = req.params;

    try {
      await this.orderService.cancelOrder(orderId);

      new HttpResponse().ok(res, {}, 204);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }
}
