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
    },
    slug: {
      type: 'string'
    },
    addedAt: {
      type: 'string'
    }
  },
  required: ['id', 'name', 'description', 'price', 'discountPercentage', 'category', 'imageUrls', 'quantity', 'slug', 'addedAt']
}
