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

        if (!name)
          return res.status(400).json({
            status: 400,
            message: 'category name is required',
          });

        try {
          const newCategory = await this.categoryService.createCategory({
            name,
            icon,
          });

          res.status(201).json(newCategory);
        } catch (error) {
          res.status(500).json(error);
        }
      }
    );
  }

  listCategories() {
    router.get('/categories', async (req, res) => {
      try {
        const categoriesList = await this.categoryService.listCategories();

        res.json(categoriesList);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }

  deleteCategory() {
    router.delete('/categories/:categoryId', async (req, res) => {
      try {
        const { categoryId } = req.params;

        await this.categoryService.deleteCategory(categoryId);

        res.status(204).send();
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }
}
