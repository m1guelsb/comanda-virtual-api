import { Request, Response } from 'express';
import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProductDto';
import { ProductService } from './product.service';

export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(
    req: Request<unknown, unknown, CreateProductDto>,
    res: Response
  ) {
    const imagePath = req.file?.filename;
    const { name, category, description, price, ingredients } = req.body;

    if (!imagePath) {
      return res.status(400).json({
        message: 'category image is required',
      });
    }

    try {
      const newProduct = await this.productService.createProduct({
        name,
        category,
        description,
        image: imagePath,
        price: Number(price),
        ingredients: ingredients ? JSON.parse(ingredients) : undefined,
      });

      res.json(newProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async listProducts(req: Request, res: Response) {
    try {
      const productsList = await this.productService.listProducts();

      res.json(productsList);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async listProductsByCategory(
    req: Request<{ categoryId: string }>,
    res: Response
  ) {
    const { categoryId } = req.params;
    try {
      const productsListByCategory =
        await this.productService.listProductsByCategory(categoryId);

      res.json(productsListByCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async editProduct(
    req: Request<{ productId: string }, unknown, EditProductDto>,
    res: Response
  ) {
    const { productId } = req.params;
    const { status } = req.body;

    try {
      const editedProduct = await this.productService.editProduct(productId, {
        status,
      });

      res.json(editedProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async deleteProduct(
    req: Request<{ productId: string }, unknown, unknown>,
    res: Response
  ) {
    const { productId } = req.params;

    try {
      await this.productService.deleteProduct(productId);

      res.status(204).send();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
