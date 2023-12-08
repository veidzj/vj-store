import { signUpInputSchema, signInInputSchema, accountSchema } from '@/main/docs/schemas/auth'
import { categorySchema, categoriesSchema, addCategoryInputSchema } from '@/main/docs/schemas/category'
import { productSchema, productsSchema, productInputSchema } from '@/main/docs/schemas/product'
import { errorSchema } from './schemas/error-schema'
import { successSchema } from './schemas/success-schema'

export default {
  error: errorSchema,
  success: successSchema,
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema,
  account: accountSchema,
  category: categorySchema,
  categories: categoriesSchema,
  addCategoryInput: addCategoryInputSchema,
  product: productSchema,
  products: productsSchema,
  productInput: productInputSchema
}
