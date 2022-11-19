import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';

export class AppModule {
  instantiate() {
    new CategoryModule().instantiate();
    new OrderModule().instantiate();
    new ProductModule().instantiate();
  }
}
