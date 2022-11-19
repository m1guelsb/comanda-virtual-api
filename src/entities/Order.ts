import { Product } from './Product';

export class Order {
  id?: string;
  table: string;
  status?: string;
  products: { product: string | Product; quantity: number }[];

  constructor({ id, table, status, products }: Order) {
    this.id = id;
    this.products = products;
    this.status = status;
    this.table = table;
  }
}
