export class Category {
  id?: string;
  name: string;
  icon: string;

  constructor({ id, name, icon }: Category) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }
}
