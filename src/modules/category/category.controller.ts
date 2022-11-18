import { HttpResponse } from '@/helpers/httpResponse';
import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async createCategory(
    req: Request<unknown, unknown, CreateCategoryDto>,
    res: Response
  ) {
    const { name, icon } = req.body;

    if (!name) new HttpResponse().badRequest(res, 'category name is required');
    if (!icon) new HttpResponse().badRequest(res, 'category icon is required');

    try {
      const newCategory = await this.categoryService.createCategory({
        name,
        icon,
      });
      new HttpResponse().ok(res, newCategory, 201);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }

  async listCategories(req: Request, res: Response) {
    try {
      const categoriesList = await this.categoryService.listCategories();

      res.json(categoriesList);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }

  async deleteCategory(req: Request<{ categoryId: string }>, res: Response) {
    try {
      const { categoryId } = req.params;

      await this.categoryService.deleteCategory(categoryId);

      new HttpResponse().ok(res, {}, 204);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }
}
