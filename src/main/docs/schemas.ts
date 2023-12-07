import { signUpInputSchema } from './schemas/sign-up-input-schema'
import { errorSchema } from './schemas/error-schema'
import { accountSchema } from './schemas/account-schema'

export default {
  signUpInput: signUpInputSchema,
  account: accountSchema,
  error: errorSchema
}
