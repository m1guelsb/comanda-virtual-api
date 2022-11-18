import { Product } from '@/entities/Product';
import { MongoProduct } from '@/database/mongodbModels';
import { CreateProductDto } from '../dto/createProduct.dto';
import { iProductRepository } from './iProductRepository';
import { EditProductDto } from '../dto/editProductDto';

export class ProductRepository implements iProductRepository {
  async create(dto: CreateProductDto) {
    const newProduct = await MongoProduct.create(dto);
    return new Product({
      id: newProduct._id.toString(),
      name: newProduct.name,
      image: newProduct.imagePath,
      category: newProduct.category?.toString(),
      price: newProduct.price,
      ingredients: newProduct.ingredients,
    });
  }

  async findAll() {
    const categoryList = await MongoProduct.find().lean();

    const cleanedCategoryList = categoryList.map((category) => {
      return new Product({
        id: category._id.toString(),
        name: category.name,
        image: category.imagePath,
        category: category.category?.toString(),
        price: category.price,
        ingredients: category.ingredients,
      });
    });

    return cleanedCategoryList;
  }

  async findAllbyCategory(categoryId: string) {
    const categoryList = await MongoProduct.find()
      .where('category')
      .equals(categoryId);

    const cleanedProductList = categoryList.map((category) => {
      return new Product({
        id: category._id.toString(),
        name: category.name,
        image: category.imagePath,
        category: category.category?.toString(),
        price: category.price,
        ingredients: category.ingredients,
      });
    });

    return cleanedProductList;
  }

  async edit(productId: string, dto: EditProductDto) {
    await MongoProduct.findByIdAndUpdate(productId, {
      dto,
    });
  }

  async delete(categoryId: string) {
    await MongoProduct.findByIdAndDelete(categoryId);
  }
}
