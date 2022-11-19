export interface CreateOrderDto {
  table: string;
  status?: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: {
    product: string;
    quantity?: number;
  }[];
}
