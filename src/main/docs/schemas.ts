import { errorSchema } from '@/main/docs/schemas/error-schema'
import { successSchema } from '@/main/docs/schemas/success-schema'
import { accountSchema, signUpInputSchema, signInInputSchema } from '@/main/docs/schemas/account'
import { categorySchema, addCategoryInputSchema } from '@/main/docs/schemas/category'

export default {
  error: errorSchema,
  success: successSchema,
  account: accountSchema,
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema,
  category: categorySchema,
  addCategoryInput: addCategoryInputSchema
}
