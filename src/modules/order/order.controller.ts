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

    const statusError = new HttpResponse().badRequest(
      res,
      'status should be "WAITING, IN_PRODUCTION or DONE"'
    );

    if (!status?.includes('WAITING')) return statusError;
    if (!status?.includes('IN_PRODUCTION')) return statusError;
    if (!status?.includes('DONE')) return statusError;

    try {
      await this.orderService.editOrder(orderId, {
        products,
        status,
        table,
      });

      new HttpResponse().ok(res, {});
    } catch (error) {
      res.json(error);
    }
  }

  async cancelOrder(
    req: Request<{ orderId: string }, unknown, unknown>,
    res: Response
  ) {
    const { orderId } = req.params;

    try {
      await this.orderService.cancelOrder(orderId);

      res.status(204).send();
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}
