import { ProductController } from './product.controller';
import { ProductService } from './product.service';

export class ProductModule {
  instantiate() {
    const controller = new ProductController(new ProductService());

    controller.createProduct();
    controller.listProducts();
    controller.editProduct();
    controller.deleteProduct();
  }
}
