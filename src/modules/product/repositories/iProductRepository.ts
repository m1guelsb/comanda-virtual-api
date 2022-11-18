import { Product } from '@/entities/Product';
import { CreateProductDto } from '../dto/createProduct.dto';
import { EditProductDto } from '../dto/editProductDto';

export interface iProductRepository {
  create: (dto: CreateProductDto) => Promise<Product>;

  findAll: () => Promise<Product[]>;

  findAllbyCategory: (categoryId: string) => Promise<Product[]>;

  edit: (productId: string, dto: EditProductDto) => Promise<void>;

  delete: (productId: string) => Promise<void>;
}
