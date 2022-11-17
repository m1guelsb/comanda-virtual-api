import { router } from '@/main';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

export class CategoryModule {
  instantiate() {
    const controller = new CategoryController(new CategoryService());

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
