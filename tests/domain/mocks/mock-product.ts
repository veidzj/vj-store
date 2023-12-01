import { faker } from '@faker-js/faker'

import { type AddProduct, type UpdateProduct } from '@/domain/usecases/product'
import { type Product } from '@/domain/models'

export const mockAddProductInput = (): AddProduct.Input => ({
  name: faker.word.words(),
  description: faker.word.words(),
  price: faker.number.int(1000),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  category: faker.word.words(),
  imageUrls: [faker.internet.url(), faker.internet.url()],
  quantity: faker.number.int(100),
  addedAt: faker.date.recent()
})

export const mockUpdateProductInput = (): UpdateProduct.Input => ({
  id: faker.string.uuid(),
  name: faker.word.words(),
  description: faker.word.words(),
  price: faker.number.int(1000),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  category: faker.word.words(),
  imageUrls: [faker.internet.url(), faker.internet.url()],
  quantity: faker.number.int(100)
})

export const mockProduct = (): Product => ({
  id: faker.string.uuid(),
  name: faker.word.words(),
  description: faker.word.words(),
  price: faker.number.int(1000),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  category: faker.word.words(),
  imageUrls: [faker.internet.url(), faker.internet.url()],
  quantity: faker.number.int(100),
  slug: faker.word.words()
})

export const mockProducts = (): Product[] => [
  mockProduct(),
  mockProduct()
]

export const mockSlug = (): string => faker.word.words()
