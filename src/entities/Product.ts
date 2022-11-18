export class Product {
  id?: string;
  name: string;
  image: string;
  price: number;
  category: string;
  ingredients: { name: string; icon: string }[];

  private constructor({
    id,
    category,
    image,
    ingredients,
    name,
    price,
  }: Product) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
    this.ingredients = ingredients;
  }
}
