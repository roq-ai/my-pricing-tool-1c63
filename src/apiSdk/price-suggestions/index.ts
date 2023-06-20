import axios from 'axios';
import queryString from 'query-string';
import { PriceSuggestionInterface, PriceSuggestionGetQueryInterface } from 'interfaces/price-suggestion';
import { GetQueryInterface } from '../../interfaces';

export const getPriceSuggestions = async (query?: PriceSuggestionGetQueryInterface) => {
  const response = await axios.get(`/api/price-suggestions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPriceSuggestion = async (priceSuggestion: PriceSuggestionInterface) => {
  const response = await axios.post('/api/price-suggestions', priceSuggestion);
  return response.data;
};

export const updatePriceSuggestionById = async (id: string, priceSuggestion: PriceSuggestionInterface) => {
  const response = await axios.put(`/api/price-suggestions/${id}`, priceSuggestion);
  return response.data;
};

export const getPriceSuggestionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/price-suggestions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePriceSuggestionById = async (id: string) => {
  const response = await axios.delete(`/api/price-suggestions/${id}`);
  return response.data;
};
