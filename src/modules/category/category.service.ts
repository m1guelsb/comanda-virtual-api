import { CreateCategoryDto } from './dto/createCategory.dto';
import { iCategoryRepository } from './repositories/iCategoryRepository';

export class CategoryService {
  constructor(private iCategoryRepository: iCategoryRepository) {}

  async createCategory({ name, icon }: CreateCategoryDto) {
    return this.iCategoryRepository.create({ name, icon });
  }

  async listCategories() {
    return this.iCategoryRepository.findAll();
  }

  async deleteCategory(categoryId: string) {
    await this.iCategoryRepository.delete(categoryId);
  }
}
