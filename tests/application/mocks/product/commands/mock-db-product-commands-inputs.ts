import { faker } from '@faker-js/faker'

import { type AddProductRepository } from '@/application/protocols/product/commands'
import { ProductHelper } from '@/domain/entities/product'

export const mockAddProductRepositoryInput = (): AddProductRepository.Input => ({
  id: faker.string.uuid(),
  name: faker.string.alpha({ length: { min: 3, max: 20 } }),
  description: faker.string.alpha({ length: { min: 50, max: 300 } }),
  price: faker.number.int({ min: 1, max: 99999 }),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  quantity: faker.number.int({ min: 0, max: 999 }),
  category: faker.commerce.department(),
  slug: ProductHelper.generateSlug(faker.string.alpha({ length: { min: 3, max: 20 } })),
  imagesUrls: [faker.internet.url(), faker.internet.url()],
  createdAt: new Date(),
  updatedAt: new Date()
})
