import * as yup from 'yup';

export const priceSuggestionValidationSchema = yup.object().shape({
  suggested_price: yup.number().integer().required(),
  product_id: yup.string().nullable(),
  manager_id: yup.string().nullable(),
});
