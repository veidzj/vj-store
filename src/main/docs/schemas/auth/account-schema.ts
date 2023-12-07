export const accountSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    accessToken: {
      type: 'string'
    }
  },
  required: ['username', 'accessToken']
}
