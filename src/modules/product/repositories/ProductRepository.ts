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
      imagePath: newProduct.imagePath,
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
        imagePath: category.imagePath,
        category: category.category?.toString(),
        price: category.price,
        ingredients: category.ingredients,
      });
    });

    return cleanedCategoryList;
  }

  async findAllbyCategory(categoryId: string) {
    const productList = await MongoProduct.find()
      .where('category')
      .equals(categoryId);

    const cleanedProductList = productList.map((product) => {
      return new Product({
        id: product._id.toString(),
        name: product.name,
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
