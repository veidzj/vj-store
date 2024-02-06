import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { GetLatestProductsMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): GetLatestProductsMongoRepository => {
  return new GetLatestProductsMongoRepository()
}

const defaultLength: number = 30
const defaultPage: number = 1
const randomDate: Date = faker.date.anytime()
const randomPage: number = faker.number.int({ min: 1, max: 5 })
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
    productCollection = await getCollection('products')
    await clearCollection(productCollection)
  })

  test('Should return all products ordered by most recent with pagination values', async() => {
    const addProductsRepositoryInput = Array.from({ length: defaultLength }, () => {
      const addProductRepositoryInput = mockAddProductRepositoryInput()
      return { ...addProductRepositoryInput, createdAt: randomDate }
    })
    await productCollection.insertMany(addProductsRepositoryInput)
    const { products, currentPage, totalPages, totalItems } = await sut.getLatest(randomPage, randomLimit)
    for (let i = 0; i < products.length - 1; i++) {
      expect(products[i].createdAt.getTime()).toBeGreaterThanOrEqual(products[i + 1].createdAt.getTime())
    }
    expect(currentPage).toBe(randomPage)
    expect(totalItems).toBe(defaultLength)
    expect(totalPages).toBe(Math.ceil(totalItems / randomLimit))
  })

  test('Should return only the limit of products of pagination', async() => {
    const addProductsRepositoryInput = Array.from({ length: defaultLength }, () => mockAddProductRepositoryInput())
    await productCollection.insertMany(addProductsRepositoryInput)
    const sut = makeSut()
    const { products } = await sut.getLatest(defaultPage, randomLimit)
    expect(products.length).toBe(randomLimit)
  })

  test('Should return an empty list if there are no products', async() => {
    const sut = makeSut()
    const { products } = await sut.getLatest(randomPage, randomLimit)
    expect(products.length).toBe(0)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
    const promise = sut.getLatest(randomPage, randomLimit)
    await expect(promise).rejects.toThrow()
  })
})
