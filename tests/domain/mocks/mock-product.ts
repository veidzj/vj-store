import { faker } from '@faker-js/faker'
import { type AddProduct } from '@/domain/usecases/product/add-product'

export const mockAddProductInput = (): AddProduct.Input => ({
  name: faker.word.words(),
  description: faker.word.words(),
  price: faker.number.int(1000),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  category: faker.word.words(),
  imageUrls: [faker.internet.url(), faker.internet.url()],
  quantity: faker.number.int(100)
})
