import { signUpPath, signInPath } from '@/main/docs/paths/auth'
import { categoryPath } from '@/main/docs/paths/category'
import { getProductsByCategoryPath, getProductsWithDiscountPath, getLatestProductsPath } from '@/main/docs/paths/product'

export default {
  '/signup': signUpPath,
  '/signin': signInPath,
  '/category': categoryPath,
  '/product/category/{categoryName}': getProductsByCategoryPath,
  '/product/discount': getProductsWithDiscountPath,
  '/product/latest': getLatestProductsPath
}
