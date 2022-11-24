export class Product {
  id?: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  category: string;
  ingredients?: { name: string; icon: string }[];

  constructor({
    id,
    category,
    description,
    imagePath,
    ingredients,
    name,
    price,
  }: Product) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
