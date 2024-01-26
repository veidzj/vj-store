import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { GetLatestProductsMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): GetLatestProductsMongoRepository => {
  return new GetLatestProductsMongoRepository()
}

const defaultLength: number = 30
const randomDate: Date = faker.date.anytime()
const defaultPage: number = 1
const randomLimit: number = faker.number.int({ min: 5, max: 25 })

describe('GetLatestProductsMongoRepository', () => {
  const sut = makeSut()

  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    productCollection = await getProductCollection()
    await clearCollection(productCollection)
  })

  test('Should return all products ordered by most recent', async() => {
    const addProductsRepositoryInput = Array.from({ length: defaultLength }, () => {
      const addProductRepositoryInput = mockAddProductRepositoryInput()
      return { ...addProductRepositoryInput, createdAt: randomDate }
    })
    await productCollection.insertMany(addProductsRepositoryInput)
    const { products } = await sut.getLatest(1, 25)
    for (let i = 0; i < products.length - 1; i++) {
      expect(products[i].createdAt.getTime()).toBeGreaterThanOrEqual(products[i + 1].createdAt.getTime())
    }
  })

  test('Should return only the limit of products of pagination', async() => {
    const addProductsRepositoryInput = Array.from({ length: defaultLength }, () => mockAddProductRepositoryInput())
    await productCollection.insertMany(addProductsRepositoryInput)
    const sut = makeSut()
    const { products } = await sut.getLatest(defaultPage, randomLimit)
    expect(products.length).toBe(randomLimit)
  })
})
