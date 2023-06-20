import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPriceSuggestion } from 'apiSdk/price-suggestions';
import { Error } from 'components/error';
import { priceSuggestionValidationSchema } from 'validationSchema/price-suggestions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { getProducts } from 'apiSdk/products';
import { getUsers } from 'apiSdk/users';
import { PriceSuggestionInterface } from 'interfaces/price-suggestion';

function PriceSuggestionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PriceSuggestionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPriceSuggestion(values);
      resetForm();
      router.push('/price-suggestions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PriceSuggestionInterface>({
    initialValues: {
      suggested_price: 0,
      product_id: (router.query.product_id as string) ?? null,
      manager_id: (router.query.manager_id as string) ?? null,
    },
    validationSchema: priceSuggestionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Price Suggestion
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="suggested_price" mb="4" isInvalid={!!formik.errors?.suggested_price}>
            <FormLabel>Suggested Price</FormLabel>
            <NumberInput
              name="suggested_price"
              value={formik.values?.suggested_price}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('suggested_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.suggested_price && <FormErrorMessage>{formik.errors?.suggested_price}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ProductInterface>
            formik={formik}
            name={'product_id'}
            label={'Select Product'}
            placeholder={'Select Product'}
            fetcher={getProducts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'manager_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'price_suggestion',
  operation: AccessOperationEnum.CREATE,
})(PriceSuggestionCreatePage);
