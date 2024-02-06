export const categoriesSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/category'
  }
}
