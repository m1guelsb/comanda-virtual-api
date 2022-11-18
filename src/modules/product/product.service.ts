import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProductDto';
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

  async listProducts() {
    return this.iProductRepository.findAll();
  }

  async listProductsByCategory(categoryId: string) {
    return this.iProductRepository.findAllbyCategory(categoryId);
  }

  async editProduct(productId: string, dto: EditProductDto) {
    return this.iProductRepository.edit(productId, dto);
  }

  async deleteProduct(productId: string) {
    return this.iProductRepository.delete(productId);
  }
}
