import { router } from '@/index';
import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  createCategory() {
    router.post(
      '/categories',
      async (
        req: Request<unknown, unknown, CreateCategoryDto>,
        res: Response
      ) => {
        const { name, icon } = req.body;

        const newCategory = await this.categoryService.createCategory({
          name,
          icon,
        });

        res.json(newCategory);
      }
    );
  }

  listCategories() {
    router.get('/categories', async (req, res) => {
      const categoriesList = await this.categoryService.listCategories();

      res.json(categoriesList);
    });
  }
}
