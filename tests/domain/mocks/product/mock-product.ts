import { faker } from '@faker-js/faker'

import { type AddProduct, type UpdateProduct } from '@/domain/usecases/product/commands'
import { ProductHelper } from '@/domain/entities/product'
import { type ProductOutput } from '@/domain/entities/product/dto'
import { type ProductsOutput } from '@/domain/usecases/product/common'

export const mockAddProductInput = (): AddProduct.Input => ({
  name: faker.string.alpha({ length: { min: 3, max: 20 } }),
  description: faker.string.alpha({ length: { min: 50, max: 300 } }),
  price: faker.number.int({ min: 1, max: 99999 }),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  quantity: faker.number.int({ min: 0, max: 999 }),
  category: faker.commerce.department(),
  imagesUrls: [faker.internet.url(), faker.internet.url()]
})

export const mockUpdateProductInput = (): UpdateProduct.Input => ({
  id: faker.string.uuid(),
  name: faker.string.alpha({ length: { min: 3, max: 20 } }),
  description: faker.string.alpha({ length: { min: 50, max: 300 } }),
  price: faker.number.int({ min: 1, max: 99999 }),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  quantity: faker.number.int({ min: 0, max: 999 }),
  category: faker.commerce.department(),
  imagesUrls: [faker.internet.url(), faker.internet.url()]
})

export const mockProductOutput = (): ProductOutput => ({
  id: faker.string.uuid(),
  name: faker.string.alpha({ length: { min: 3, max: 20 } }),
  description: faker.string.alpha({ length: { min: 50, max: 300 } }),
  price: faker.number.int({ min: 1, max: 99999 }),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  quantity: faker.number.int({ min: 0, max: 999 }),
  category: faker.commerce.department(),
  slug: ProductHelper.generateSlug(faker.string.alpha({ length: { min: 3, max: 20 } })),
  imagesUrls: [faker.internet.url(), faker.internet.url()],
  createdAt: faker.date.anytime()
})

export const mockProductsOutput = (): ProductsOutput => ({
  products: [mockProductOutput(), mockProductOutput()],
  currentPage: faker.number.int({ min: 0, max: 100 }),
  totalPages: faker.number.int({ min: 0, max: 100 }),
  totalItems: faker.number.int({ min: 0, max: 100 })
})
