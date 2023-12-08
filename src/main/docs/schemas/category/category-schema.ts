export const categorySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    }
  },
  required: ['id', 'name']
}
