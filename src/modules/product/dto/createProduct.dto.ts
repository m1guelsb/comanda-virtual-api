export interface CreateProductDto {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  ingredients?: string;
}
