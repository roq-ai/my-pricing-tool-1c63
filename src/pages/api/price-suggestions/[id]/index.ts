import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { priceSuggestionValidationSchema } from 'validationSchema/price-suggestions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.price_suggestion
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPriceSuggestionById();
    case 'PUT':
      return updatePriceSuggestionById();
    case 'DELETE':
      return deletePriceSuggestionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPriceSuggestionById() {
    const data = await prisma.price_suggestion.findFirst(convertQueryToPrismaUtil(req.query, 'price_suggestion'));
    return res.status(200).json(data);
  }

  async function updatePriceSuggestionById() {
    await priceSuggestionValidationSchema.validate(req.body);
    const data = await prisma.price_suggestion.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePriceSuggestionById() {
    const data = await prisma.price_suggestion.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
