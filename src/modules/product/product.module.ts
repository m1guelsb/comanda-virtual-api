import { router } from '@/main';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/ProductRepository';
import multer from 'multer';
import path = require('path');

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

    router.get('/products', (req, res) => controller.listProducts(req, res));

    router.get('/categories/:categoryId/products', (req, res) =>
      controller.listProductsByCategory(req, res)
    );

    router.patch('/products/:productId', (req, res) =>
      controller.editProduct(req, res)
    );

    router.delete('/products/:productId', (req, res) =>
      controller.deleteProduct(req, res)
    );
  }
}
