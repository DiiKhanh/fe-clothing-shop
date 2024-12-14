import { Product } from './product';

export interface Category {
  readonly _id: string;
  name: string;
  types: CategoryType[];
  products: string[] | Product[];
  type?: string
}

export interface CategoryType {
  readonly _id: string;
  type: string;
  products: string[] | Product[];
}
