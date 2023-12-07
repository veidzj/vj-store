import { signUpInputSchema, accountSchema } from '@/main/docs/schemas/auth'
import { errorSchema } from './schemas/error-schema'

export default {
  signUpInput: signUpInputSchema,
  account: accountSchema,
  error: errorSchema
}
