import * as yup from 'yup';

export const pricingHistoryValidationSchema = yup.object().shape({
  old_price: yup.number().integer().required(),
  new_price: yup.number().integer().required(),
  change_date: yup.date().required(),
  sales_velocity: yup.number().integer(),
  bestseller_rank: yup.number().integer(),
  margin: yup.number().integer(),
  product_id: yup.string().nullable(),
});
