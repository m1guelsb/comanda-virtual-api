import path from 'node:path';
import { router } from '@/index';

import { Request, Response } from 'express';
import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProductDto';
import { ProductService } from './product.service';

import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '../../../', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export class ProductController {
  constructor(private productService: ProductService) {}

  createProduct() {
    router.post(
      '/products',
      upload.single('image'),
      async (
        req: Request<unknown, unknown, CreateProductDto>,
        res: Response
      ) => {
        const imagePath = req.file?.filename;
        const { name, category, description, price, ingredients } = req.body;

        if (!imagePath) {
          console.log('alo');
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
            ingredients: JSON.parse(ingredients),
          });

          res.json(newProduct);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
    );
  }

  listProducts() {
    router.get('/products', async (req, res) => {
      try {
        const productsList = await this.productService.listProducts();

        res.json(productsList);
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  }

  editProduct() {
    router.patch(
      '/products/:productId',
      async (
        req: Request<{ productId: string }, unknown, EditProductDto>,
        res: Response
      ) => {
        const { productId } = req.params;
        const { status } = req.body;

        try {
          const editedProduct = await this.productService.editProduct(
            productId,
            {
              status,
            }
          );

          res.json(editedProduct);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
    );
  }

  deleteProduct() {
    router.delete(
      '/products/:productId',
      async (
        req: Request<{ productId: string }, unknown, unknown>,
        res: Response
      ) => {
        const { productId } = req.params;

        try {
          await this.productService.deleteProduct(productId);

          res.status(204).send();
        } catch (error) {
          return res.status(500).json(error);
        }
      }
    );
  }
}
