import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { GetProductsByCategoryMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): GetProductsByCategoryMongoRepository => {
  return new GetProductsByCategoryMongoRepository()
}

const defaultPage: number = 1
const randomLimit: number = faker.number.int({ min: 5, max: 25 })

describe('GetProductsByCategoryMongoRepository', () => {
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

  test('Should return all products on success', async() => {
    const addProductsRepositoryInput = [mockAddProductRepositoryInput(), mockAddProductRepositoryInput()]
    await productCollection.insertMany(addProductsRepositoryInput)
    const sut = makeSut()
    const { products } = await sut.getByCategory(addProductsRepositoryInput[0].category, defaultPage, randomLimit)
    expect(products.length).toBe(1)
    expect(products[0].id).toBeTruthy()
    expect(products[0].name).toBe(addProductsRepositoryInput[0].name)
    expect(products[0].description).toBe(addProductsRepositoryInput[0].description)
    expect(products[0].price).toBe(addProductsRepositoryInput[0].price)
    expect(products[0].discountPercentage).toBe(addProductsRepositoryInput[0].discountPercentage)
    expect(products[0].category).toBe(addProductsRepositoryInput[0].category)
    expect(products[0].imagesUrls).toEqual(addProductsRepositoryInput[0].imagesUrls)
    expect(products[0].quantity).toBe(addProductsRepositoryInput[0].quantity)
  })
})
