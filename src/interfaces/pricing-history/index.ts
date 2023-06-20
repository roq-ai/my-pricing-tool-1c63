import { ProductInterface } from 'interfaces/product';
import { GetQueryInterface } from 'interfaces';

export interface PricingHistoryInterface {
  id?: string;
  product_id?: string;
  old_price: number;
  new_price: number;
  change_date: any;
  sales_velocity?: number;
  bestseller_rank?: number;
  margin?: number;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  _count?: {};
}

export interface PricingHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
}
