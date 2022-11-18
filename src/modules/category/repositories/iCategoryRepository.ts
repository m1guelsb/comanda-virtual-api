import { Category } from '@/entities/Category';
import { CreateCategoryDto } from '../dto/createCategory.dto';

export interface iCategoryRepository {
  create: (data: CreateCategoryDto) => Promise<Category>;

  findAll: () => Promise<Category[]>;

  delete: (categoryId: string) => Promise<void>;
}
