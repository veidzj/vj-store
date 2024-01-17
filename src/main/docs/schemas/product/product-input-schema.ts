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
    quantity: {
      type: 'number'
    },
    category: {
      type: 'string'
    },
    imagesUrls: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['name', 'description', 'price', 'discountPercentage', 'quantity', 'category', 'imagesUrls']
}
