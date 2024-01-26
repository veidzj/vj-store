import { errorSchema } from '@/main/docs/schemas/error-schema'
import { successSchema } from '@/main/docs/schemas/success-schema'
import { accountSchema, signUpInputSchema, signInInputSchema } from '@/main/docs/schemas/account'
import { categorySchema, categoriesSchema, addCategoryInputSchema } from '@/main/docs/schemas/category'
import { productSchema, productInputSchema, productOutputSchema } from '@/main/docs/schemas/product'

export default {
  error: errorSchema,
  success: successSchema,
  account: accountSchema,
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema,
  category: categorySchema,
  categories: categoriesSchema,
  addCategoryInput: addCategoryInputSchema,
  product: productSchema,
  productInput: productInputSchema,
  productOutput: productOutputSchema
}
