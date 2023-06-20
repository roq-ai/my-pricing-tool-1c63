const mapping: Record<string, string> = {
  organizations: 'organization',
  'price-suggestions': 'price_suggestion',
  'pricing-histories': 'pricing_history',
  products: 'product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
