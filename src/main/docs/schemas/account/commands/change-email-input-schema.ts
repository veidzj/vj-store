export const changeEmailInputSchema = {
  type: 'object',
  properties: {
    currentEmail: {
      type: 'string'
    },
    newEmail: {
      type: 'string'
    }
  },
  required: ['currentEmail', 'newEmail']
}
