export const productInputSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    discountPercentage: {
      type: 'number'
    },
    category: {
      type: 'string'
    },
    imageUrls: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    quantity: {
      type: 'number'
    }
  },
  required: ['name', 'description', 'price', 'discountPercentage', 'category', 'imageUrls', 'quantity']
}
