import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProductDto';
import { ListProductsFilterQueries } from './product.controller';
import { iProductRepository } from './repositories/iProductRepository';

export class ProductService {
  constructor(private iProductRepository: iProductRepository) {}

  async createProduct({
    name,
    category,
    description,
    image,
    price,
    ingredients,
  }: CreateProductDto) {
    return this.iProductRepository.create({
      name,
      category,
      description,
      image,
      price,
      ingredients,
    });
  }

  async listProducts(filterParams: ListProductsFilterQueries) {
    return this.iProductRepository.findAll(filterParams);
  }

  async editProduct(productId: string, dto: EditProductDto) {
    return this.iProductRepository.edit(productId, dto);
  }

  async deleteProduct(productId: string) {
    return this.iProductRepository.delete(productId);
  }
}
