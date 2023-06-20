import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import {
  Text,
  Box,
  Spinner,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Link,
  IconButton,
  Flex,
  Center,
  Stack,
} from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { FiTrash, FiEdit2, FiEdit3 } from 'react-icons/fi';
import { getPricingHistoryById } from 'apiSdk/pricing-histories';
import { Error } from 'components/error';
import { PricingHistoryInterface } from 'interfaces/pricing-history';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function PricingHistoryViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PricingHistoryInterface>(
    () => (id ? `/pricing-histories/${id}` : null),
    () =>
      getPricingHistoryById(id, {
        relations: ['product'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Flex justifyContent="space-between" mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Pricing History Detail View
          </Text>
          {hasAccess('pricing_history', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
            <NextLink href={`/pricing-histories/edit/${data?.id}`} passHref legacyBehavior>
              <Button
                onClick={(e) => e.stopPropagation()}
                mr={2}
                as="a"
                variant="outline"
                colorScheme="blue"
                leftIcon={<FiEdit2 />}
              >
                Edit
              </Button>
            </NextLink>
          )}
        </Flex>
        {error && (
          <Box mb={4}>
            {' '}
            <Error error={error} />{' '}
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <Stack direction="column" spacing={2} mb={4}>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Old Price:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.old_price}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  New Price:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.new_price}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Change Date:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.change_date as unknown as string}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Sales Velocity:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.sales_velocity}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Bestseller Rank:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.bestseller_rank}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Margin:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.margin}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Created At:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.created_at as unknown as string}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Updated At:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.updated_at as unknown as string}
                </Text>
              </Flex>
            </Stack>
            <Box>
              {hasAccess('product', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                <Flex alignItems="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" as="span">
                    Product:
                  </Text>
                  <Text fontSize="md" as="span" ml={3}>
                    <Link as={NextLink} href={`/products/view/${data?.product?.id}`}>
                      {data?.product?.name}
                    </Link>
                  </Text>
                </Flex>
              )}
            </Box>
            <Box></Box>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'pricing_history',
  operation: AccessOperationEnum.READ,
})(PricingHistoryViewPage);
