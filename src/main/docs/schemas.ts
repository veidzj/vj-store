import { errorSchema } from '@/main/docs/schemas/error-schema'
import { successSchema } from '@/main/docs/schemas/success-schema'
import { accountSchema, signUpInputSchema, signInInputSchema, changeEmailInputSchema } from '@/main/docs/schemas/account'
import { categorySchema, categoriesSchema, addCategoryInputSchema } from '@/main/docs/schemas/category'
import { productSchema, productsSchema, productInputSchema } from '@/main/docs/schemas/product'

export default {
  error: errorSchema,
  success: successSchema,
  account: accountSchema,
  signUpInput: signUpInputSchema,
  signInInput: signInInputSchema,
  changeEmailInput: changeEmailInputSchema,
  category: categorySchema,
  categories: categoriesSchema,
  addCategoryInput: addCategoryInputSchema,
  product: productSchema,
  products: productsSchema,
  productInput: productInputSchema
}
