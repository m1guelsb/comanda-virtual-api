import { HttpResponse } from '@/helpers/httpResponse';
import { Request, Response } from 'express';
import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProductDto';
import { ProductService } from './product.service';

export interface ListProductsFilterQueries {
  categoryId: string;
}
export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(
    req: Request<unknown, unknown, CreateProductDto>,
    res: Response
  ) {
    const imagePath = req.file?.filename;
    const { name, category, description, price, ingredients } = req.body;

    if (!name) return new HttpResponse().badRequest(res, 'name is required');
    if (!imagePath)
      return new HttpResponse().badRequest(res, 'image is required');
    if (!category)
      return new HttpResponse().badRequest(res, 'category is required');
    if (!description)
      return new HttpResponse().badRequest(res, 'description is required');
    if (!price) return new HttpResponse().badRequest(res, 'price is required');
    if (typeof price === 'number')
      return new HttpResponse().badRequest(res, 'price must be a integer type');

    try {
      const newProduct = await this.productService.createProduct({
        name,
        category,
        description,
        image: imagePath,
        price: Number(price),
        ingredients: ingredients ? JSON.parse(ingredients) : undefined,
      });

      new HttpResponse().ok(res, newProduct, 201);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }

  async listProducts(
    req: Request<undefined, unknown, unknown, ListProductsFilterQueries>,
    res: Response
  ) {
    const { categoryId } = req.query;

    try {
      const productsList = await this.productService.listProducts({
        categoryId,
      });

      new HttpResponse().ok(res, productsList);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }

  async editProduct(
    req: Request<{ productId: string }, unknown, EditProductDto>,
    res: Response
  ) {
    const { productId } = req.params;

    const imagePath = req.file?.filename;
    const { name, category, description, price, ingredients } = req.body;

    console.log('req.body', req.body);

    try {
      const editedProduct = await this.productService.editProduct(productId, {
        category,
        description,
        image: imagePath,
        name,
        price,
        ingredients,
      });

      new HttpResponse().ok(res, editedProduct);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }

  async deleteProduct(
    req: Request<{ productId: string }, unknown, unknown>,
    res: Response
  ) {
    const { productId } = req.params;

    try {
      await this.productService.deleteProduct(productId);

      new HttpResponse().ok(res, {}, 204);
    } catch (error) {
      new HttpResponse().serverError(res, error);
    }
  }
}
