export const changePasswordInputSchema = {
  type: 'object',
  properties: {
    currentPassword: {
      type: 'string'
    },
    newPassword: {
      type: 'string'
    }
  },
  required: ['currentPassword', 'newPassword']
}
