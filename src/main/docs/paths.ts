import { signUpPath, signInPath, changeEmailPath } from '@/main/docs/paths/account'
import { categoryPath } from '@/main/docs/paths/category'
import { addProductPath, updateProductPath, getLatestProductsPath, getProductsWithDiscountPath, getProductsByCategoryPath, getProductBySlugPath } from '@/main/docs/paths/product'

export default {
  '/account/signup': signUpPath,
  '/account/signin': signInPath,
  '/account/change-email': changeEmailPath,
  '/category': categoryPath,
  '/product': addProductPath,
  '/product/{id}': updateProductPath,
  '/product/latest': getLatestProductsPath,
  '/product/discount': getProductsWithDiscountPath,
  '/product/category/{category}': getProductsByCategoryPath,
  '/product/{slug}': getProductBySlugPath
}
