import { signUpPath, signInPath } from '@/main/docs/paths/account'
import { categoryPath } from '@/main/docs/paths/category'
import { addProductPath, updateProductPath } from '@/main/docs/paths/product'

export default {
  '/signup': signUpPath,
  '/signin': signInPath,
  '/category': categoryPath,
  '/product': addProductPath,
  '/product/{id}': updateProductPath
}
