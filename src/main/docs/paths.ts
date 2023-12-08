import { signUpPath, signInPath } from '@/main/docs/paths/auth'
import { categoryPath } from '@/main/docs/paths/category'
import { addProductPath, updateProductPath, getProductBySlugPath, getProductsByCategoryPath, getProductsWithDiscountPath, getLatestProductsPath } from '@/main/docs/paths/product'

export default {
  '/signup': signUpPath,
  '/signin': signInPath,
  '/category': categoryPath,
  '/product': addProductPath,
  '/product/{id}': updateProductPath,
  '/product/slug/{slug}': getProductBySlugPath,
  '/product/category/{categoryName}': getProductsByCategoryPath,
  '/product/discount': getProductsWithDiscountPath,
  '/product/latest': getLatestProductsPath
}
