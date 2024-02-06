import { signUpPath, signInPath } from '@/main/docs/paths/account/authentication'
import { changeEmailPath, changePasswordPath } from '@/main/docs/paths/account/commands'
import { categoryPath } from '@/main/docs/paths/category'
import { addProductPath, updateProductPath } from '@/main/docs/paths/product/commands'
import { getLatestProductsPath, getProductsWithDiscountPath, getProductsByCategoryPath, getProductBySlugPath } from '@/main/docs/paths/product/queries'

export default {
  '/account/sign-up': signUpPath,
  '/account/sign-in': signInPath,
  '/account/change-email': changeEmailPath,
  '/account/change-password': changePasswordPath,
  '/category': categoryPath,
  '/product': addProductPath,
  '/product/{id}': updateProductPath,
  '/product/latest': getLatestProductsPath,
  '/product/discount': getProductsWithDiscountPath,
  '/product/category/{category}': getProductsByCategoryPath,
  '/product/{slug}': getProductBySlugPath
}
