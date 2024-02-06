import { faker } from '@faker-js/faker'

import { ProductHelper } from '@/domain/entities/product'
import { type ProductOutput, type ProductsOutput } from '@/domain/dtos/product'

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
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime()
})

export const mockProductsOutput = (): ProductsOutput => ({
  products: [mockProductOutput(), mockProductOutput()],
  currentPage: faker.number.int({ min: 0, max: 100 }),
  totalPages: faker.number.int({ min: 0, max: 100 }),
  totalItems: faker.number.int({ min: 0, max: 100 })
})
