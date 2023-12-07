import { signUpInputSchema, signInInputSchema, accountSchema } from '@/main/docs/schemas/auth'
import { categorySchema, categoriesSchema, addCategoryInputSchema } from '@/main/docs/schemas/category'
import { errorSchema } from './schemas/error-schema'

export default {
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema,
  account: accountSchema,
  error: errorSchema,
  category: categorySchema,
  categories: categoriesSchema,
  addCategoryInput: addCategoryInputSchema
}
