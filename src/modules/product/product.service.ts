import { Product } from '@/models/Product';
import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProductDto';

export class ProductService {
  async createProduct({
    name,
    category,
    description,
    image,
    price,
    ingredients,
  }: CreateProductDto) {
    const newProduct = await Product.create({
      name: name,
      category: category,
      description: description,
      imagePath: image,
      ingredients: ingredients,
      price: price,
    });

    return newProduct;
  }

  async listProducts() {
    const categoriesList = await Product.find();

    return categoriesList;
  }

  async editProduct(productId: string, { status }: EditProductDto) {
    const editedOrder = await Product.findByIdAndUpdate(productId, { status });

    return editedOrder;
  }

  async deleteProduct(productId: string) {
    const result = await Product.findByIdAndDelete(productId);
    return result;
  }
}
