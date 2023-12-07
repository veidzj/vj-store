import { signUpInputSchema, signInInputSchema, accountSchema } from '@/main/docs/schemas/auth'
import { errorSchema } from './schemas/error-schema'

export default {
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema,
  account: accountSchema,
  error: errorSchema
}
