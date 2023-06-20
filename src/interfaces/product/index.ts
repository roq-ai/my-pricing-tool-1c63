import { PriceSuggestionInterface } from 'interfaces/price-suggestion';
import { PricingHistoryInterface } from 'interfaces/pricing-history';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  price: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  price_suggestion?: PriceSuggestionInterface[];
  pricing_history?: PricingHistoryInterface[];
  organization?: OrganizationInterface;
  _count?: {
    price_suggestion?: number;
    pricing_history?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
