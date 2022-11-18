import { router } from '@/main';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repositories/CategoryRepository';

export class CategoryModule {
  instantiate() {
    const repository = new CategoryRepository();
    const service = new CategoryService(repository);
    const controller = new CategoryController(service);

    router.post('/categories', (req, res) =>
      controller.createCategory(req, res)
    );

    router.get('/categories', (req, res) =>
      controller.listCategories(req, res)
    );

    router.delete('/categories/:categoryId', (req, res) =>
      controller.deleteCategory(req, res)
    );
  }
}
