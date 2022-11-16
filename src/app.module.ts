import { CategoryModule } from './modules/category/category.module';

export class AppModule {
  instantiate() {
    new CategoryModule().instantiate();
  }
}
