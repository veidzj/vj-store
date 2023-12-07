export const productsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/product'
  }
}
