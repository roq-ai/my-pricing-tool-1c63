import axios from 'axios';
import queryString from 'query-string';
import { PricingHistoryInterface, PricingHistoryGetQueryInterface } from 'interfaces/pricing-history';
import { GetQueryInterface } from '../../interfaces';

export const getPricingHistories = async (query?: PricingHistoryGetQueryInterface) => {
  const response = await axios.get(`/api/pricing-histories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPricingHistory = async (pricingHistory: PricingHistoryInterface) => {
  const response = await axios.post('/api/pricing-histories', pricingHistory);
  return response.data;
};

export const updatePricingHistoryById = async (id: string, pricingHistory: PricingHistoryInterface) => {
  const response = await axios.put(`/api/pricing-histories/${id}`, pricingHistory);
  return response.data;
};

export const getPricingHistoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pricing-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePricingHistoryById = async (id: string) => {
  const response = await axios.delete(`/api/pricing-histories/${id}`);
  return response.data;
};
