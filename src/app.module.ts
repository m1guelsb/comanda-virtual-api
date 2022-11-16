import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';

export class AppModule {
  instantiate() {
    new CategoryModule().instantiate();
    new ProductModule().instantiate();
  }
}
