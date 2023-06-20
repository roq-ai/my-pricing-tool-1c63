import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PriceSuggestionInterface {
  id?: string;
  product_id?: string;
  suggested_price: number;
  manager_id?: string;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  user?: UserInterface;
  _count?: {};
}

export interface PriceSuggestionGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  manager_id?: string;
}
