import { router } from '@/main';
import {
  ListProductsFilterQueries,
  ProductController,
} from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/ProductRepository';
import multer from 'multer';
import path = require('path');
import { Request } from 'express';

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '../../../uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export class ProductModule {
  instantiate() {
    const repository = new ProductRepository();
    const service = new ProductService(repository);
    const controller = new ProductController(service);

    router.post('/products', upload.single('image'), (req, res) =>
      controller.createProduct(req, res)
    );

    router.get(
      '/products',
      (
        req: Request<undefined, unknown, unknown, ListProductsFilterQueries>,
        res
      ) => controller.listProducts(req, res)
    );

    router.patch('/products/:productId', (req, res) =>
      controller.editProduct(req, res)
    );

    router.delete('/products/:productId', (req, res) =>
      controller.deleteProduct(req, res)
    );
  }
}
