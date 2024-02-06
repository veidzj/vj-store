export const productsSchema = {
  type: 'object',
  properties: {
    products: {
      type: 'array',
      items: {
        $ref: '#/schemas/product'
      }
    },
    currentPage: {
      type: 'number'
    },
    totalPages: {
      type: 'number'
    },
    totalItems: {
      type: 'number'
    }
  },
  required: ['products', 'currentPage', 'totalPages', 'totalItems']
}
