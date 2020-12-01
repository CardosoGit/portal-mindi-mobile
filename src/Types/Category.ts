import { Product } from "./Product";

export interface Category {
  _id: string;
  is_active: boolean;
  itens: Product[];
  nameShow: string;
}
