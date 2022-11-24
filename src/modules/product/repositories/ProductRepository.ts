import { Product } from '@/entities/Product';
import { MongoProduct } from '@/database/mongodbModels';
import { CreateProductDto } from '../dto/createProduct.dto';
import { iProductRepository } from './iProductRepository';
import { EditProductDto } from '../dto/editProductDto';

export class ProductRepository implements iProductRepository {
  async create(dto: CreateProductDto) {
    const newProduct = await MongoProduct.create({
      ...dto,
      imagePath: dto.image,
    });
    return new Product({
      id: newProduct._id.toString(),
      name: newProduct.name,
      description: newProduct.description,
      imagePath: newProduct.imagePath,
      category: newProduct.category?.toString(),
      price: newProduct.price,
      ingredients: newProduct.ingredients,
    });
  }

  async findAll() {
    const productList = await MongoProduct.find().lean();

    const cleanedProductList = productList.map((product) => {
      return new Product({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        imagePath: product.imagePath,
        category: product.category?.toString(),
        price: product.price,
        ingredients: product.ingredients,
      });
    });

    return cleanedProductList;
  }

  async findAllbyCategory(categoryId: string) {
    const productList = await MongoProduct.find()
      .where('category')
      .equals(categoryId);

    const cleanedProductList = productList.map((product) => {
      return new Product({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        imagePath: product.imagePath,
        category: product.category?.toString(),
        price: product.price,
        ingredients: product.ingredients,
      });
    });

    return cleanedProductList;
  }

  async edit(productId: string, dto: EditProductDto) {
    await MongoProduct.findOneAndUpdate(
      { _id: productId },
      {
        name: dto.name,
        category: dto.category,
        description: dto.description,
        imagePath: dto.image,
        ingredients: dto.ingredients,
        price: dto.price,
      }
    );
  }

  async delete(categoryId: string) {
    await MongoProduct.findByIdAndDelete(categoryId);
  }
}
