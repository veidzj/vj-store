export const productSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
    slug: {
      type: 'string'
    },
    imageUrls: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    createdAt: {
      type: 'string'
    }
  },
  required: ['id', 'name', 'description', 'price', 'discountPercentage', 'quantity', 'category', 'slug', 'imageUrls', 'createdAt']
}
