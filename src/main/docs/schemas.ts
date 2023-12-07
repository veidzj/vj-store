import { signUpInputSchema, signInInputSchema, accountSchema } from '@/main/docs/schemas/auth'
import { categorySchema, categoriesSchema, addCategoryInputSchema } from '@/main/docs/schemas/category'
import { productSchema, productsSchema, updateProductInputSchema } from '@/main/docs/schemas/product'
import { errorSchema } from './schemas/error-schema'

export default {
  error: errorSchema,
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema,
  account: accountSchema,
  category: categorySchema,
  categories: categoriesSchema,
  addCategoryInput: addCategoryInputSchema,
  product: productSchema,
  products: productsSchema,
  updateProductInput: updateProductInputSchema
}
