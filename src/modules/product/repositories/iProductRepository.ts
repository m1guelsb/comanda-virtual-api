import { Product } from '@/entities/Product';
import { CreateProductDto } from '../dto/createProduct.dto';
import { EditProductDto } from '../dto/editProductDto';
import { ListProductsFilterQueries } from '../product.controller';

export interface iProductRepository {
  create: (dto: CreateProductDto) => Promise<Product>;

  findAll: (filterParams: ListProductsFilterQueries) => Promise<Product[]>;

  edit: (productId: string, dto: EditProductDto) => Promise<void>;

  delete: (productId: string) => Promise<void>;
}
