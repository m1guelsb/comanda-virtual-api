export class Product {
  id?: string;
  name: string;
  imagePath: string;
  price: number;
  category: string;
  ingredients?: { name: string; icon: string }[];

  constructor({ id, category, imagePath, ingredients, name, price }: Product) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
