import { Category } from '@/entities/Category';
import { MongoCategory } from '@/database/mongodbModels';
import { CreateCategoryDto } from '../dto/createCategory.dto';
import { iCategoryRepository } from './iCategoryRepository';

export class CategoryRepository implements iCategoryRepository {
  async create({ name, icon }: CreateCategoryDto) {
    const newCategory = await MongoCategory.create({ name, icon });
    return new Category({
      id: newCategory._id.toString(),
      name: newCategory.name,
      icon: newCategory.icon,
    });
  }

  async findAll() {
    const categoryList = await MongoCategory.find().lean();

    const cleanedCategoryList = categoryList.map((category) => {
      return new Category({
        id: category._id.toString(),
        name: category.name,
        icon: category.icon,
      });
    });
    return cleanedCategoryList;
  }

  async delete(categoryId: string) {
    await MongoCategory.findByIdAndDelete(categoryId);
  }
}
