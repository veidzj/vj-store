import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { GetProductsWithDiscountMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): GetProductsWithDiscountMongoRepository => {
  return new GetProductsWithDiscountMongoRepository()
}

const defaultPage: number = 1
const randomLimit: number = faker.number.int({ min: 5, max: 25 })
const noDiscount: number = 0
const moreDiscount: number = 50

describe('GetProductsWithDiscountMongoRepository', () => {
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

  test('Should return all products with discount on success', async() => {
    const mockProductWithNoDiscount = { ...mockAddProductRepositoryInput(), discountPercentage: noDiscount }
    const mockProductWithDiscount = { ...mockAddProductRepositoryInput(), discountPercentage: moreDiscount }
    const addProductsRepositoryInput = [mockProductWithNoDiscount, mockProductWithDiscount]
    await productCollection.insertMany(addProductsRepositoryInput)
    const sut = makeSut()
    const { products } = await sut.getWithDiscount(defaultPage, randomLimit)
    expect(products.length).toBe(1)
    expect(products[0].id).toBeTruthy()
    expect(products[0].name).toBe(mockProductWithDiscount.name)
    expect(products[0].description).toBe(mockProductWithDiscount.description)
    expect(products[0].price).toBe(mockProductWithDiscount.price)
    expect(products[0].discountPercentage).toBe(mockProductWithDiscount.discountPercentage)
    expect(products[0].category).toBe(mockProductWithDiscount.category)
    expect(products[0].imagesUrls).toEqual(mockProductWithDiscount.imagesUrls)
    expect(products[0].quantity).toBe(mockProductWithDiscount.quantity)
  })
})
