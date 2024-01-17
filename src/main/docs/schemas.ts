import { errorSchema } from '@/main/docs/schemas/error-schema'
import { successSchema } from '@/main/docs/schemas/success-schema'
import { signUpInputSchema, signInInputSchema, accountSchema } from '@/main/docs/schemas/account'

export default {
  error: errorSchema,
  success: successSchema,
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema,
  account: accountSchema
}
