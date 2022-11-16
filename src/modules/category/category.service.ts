import { Category } from '@/models/Category';
import { CreateCategoryDto } from './dto/createCategory.dto';

export class CategoryService {
  async createCategory({ name, icon }: CreateCategoryDto) {
    const newCategory = await Category.create({
      name,
      icon,
    });

    return newCategory;
  }

  async listCategories() {
    const categoriesList = await Category.find();

    return categoriesList;
  }
}
