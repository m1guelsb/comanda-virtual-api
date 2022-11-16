import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

export class CategoryModule {
  instantiate() {
    const controller = new CategoryController(new CategoryService());

    controller.createCategory();
    controller.listCategories();
    controller.deleteCategory();
  }
}
