import { errorSchema } from '@/main/docs/schemas/error-schema'
import { successSchema } from '@/main/docs/schemas/success-schema'

import { accountSchema, signUpInputSchema, signInInputSchema } from '@/main/docs/schemas/account/authentication'
import { changeEmailInputSchema } from '@/main/docs/schemas/account/commands'

import { categorySchema, categoriesSchema } from '@/main/docs/schemas/category/queries'
import { addCategoryInputSchema } from '@/main/docs/schemas/category/commands'

import { productSchema, productsSchema } from '@/main/docs/schemas/product/queries'
import { productInputSchema } from '@/main/docs/schemas/product/commands'

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
