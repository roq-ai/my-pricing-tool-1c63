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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPricingHistoryById, updatePricingHistoryById } from 'apiSdk/pricing-histories';
import { Error } from 'components/error';
import { pricingHistoryValidationSchema } from 'validationSchema/pricing-histories';
import { PricingHistoryInterface } from 'interfaces/pricing-history';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ProductInterface } from 'interfaces/product';
import { getProducts } from 'apiSdk/products';

function PricingHistoryEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PricingHistoryInterface>(
    () => (id ? `/pricing-histories/${id}` : null),
    () => getPricingHistoryById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PricingHistoryInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePricingHistoryById(id, values);
      mutate(updated);
      resetForm();
      router.push('/pricing-histories');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PricingHistoryInterface>({
    initialValues: data,
    validationSchema: pricingHistoryValidationSchema,
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
            Edit Pricing History
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="old_price" mb="4" isInvalid={!!formik.errors?.old_price}>
              <FormLabel>Old Price</FormLabel>
              <NumberInput
                name="old_price"
                value={formik.values?.old_price}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('old_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.old_price && <FormErrorMessage>{formik.errors?.old_price}</FormErrorMessage>}
            </FormControl>
            <FormControl id="new_price" mb="4" isInvalid={!!formik.errors?.new_price}>
              <FormLabel>New Price</FormLabel>
              <NumberInput
                name="new_price"
                value={formik.values?.new_price}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('new_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.new_price && <FormErrorMessage>{formik.errors?.new_price}</FormErrorMessage>}
            </FormControl>
            <FormControl id="change_date" mb="4">
              <FormLabel>Change Date</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.change_date ? new Date(formik.values?.change_date) : null}
                  onChange={(value: Date) => formik.setFieldValue('change_date', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <FormControl id="sales_velocity" mb="4" isInvalid={!!formik.errors?.sales_velocity}>
              <FormLabel>Sales Velocity</FormLabel>
              <NumberInput
                name="sales_velocity"
                value={formik.values?.sales_velocity}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('sales_velocity', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.sales_velocity && <FormErrorMessage>{formik.errors?.sales_velocity}</FormErrorMessage>}
            </FormControl>
            <FormControl id="bestseller_rank" mb="4" isInvalid={!!formik.errors?.bestseller_rank}>
              <FormLabel>Bestseller Rank</FormLabel>
              <NumberInput
                name="bestseller_rank"
                value={formik.values?.bestseller_rank}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('bestseller_rank', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.bestseller_rank && <FormErrorMessage>{formik.errors?.bestseller_rank}</FormErrorMessage>}
            </FormControl>
            <FormControl id="margin" mb="4" isInvalid={!!formik.errors?.margin}>
              <FormLabel>Margin</FormLabel>
              <NumberInput
                name="margin"
                value={formik.values?.margin}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('margin', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.margin && <FormErrorMessage>{formik.errors?.margin}</FormErrorMessage>}
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
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'pricing_history',
  operation: AccessOperationEnum.UPDATE,
})(PricingHistoryEditPage);
