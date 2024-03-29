import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { GetProductsByCategoryMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): GetProductsByCategoryMongoRepository => {
  return new GetProductsByCategoryMongoRepository()
}

const defaultLength: number = 30
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
    productCollection = await getCollection('products')
    await clearCollection(productCollection)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
    const promise = sut.getByCategory(mockAddProductRepositoryInput().category, defaultPage, randomLimit)
    await expect(promise).rejects.toThrow()
  })

  test('Should return all products on success', async() => {
    const addProductsRepositoryInput = [mockAddProductRepositoryInput(), mockAddProductRepositoryInput()]
    await productCollection.insertMany(addProductsRepositoryInput)
    const sut = makeSut()
    const { products, currentPage, totalPages, totalItems } = await sut.getByCategory(addProductsRepositoryInput[0].category, defaultPage, randomLimit)
    expect(products.length).toBe(1)
    expect(products[0].id).toBeTruthy()
    expect(products[0].name).toBe(addProductsRepositoryInput[0].name)
    expect(products[0].description).toBe(addProductsRepositoryInput[0].description)
    expect(products[0].price).toBe(addProductsRepositoryInput[0].price)
    expect(products[0].discountPercentage).toBe(addProductsRepositoryInput[0].discountPercentage)
    expect(products[0].category).toBe(addProductsRepositoryInput[0].category)
    expect(products[0].imagesUrls).toEqual(addProductsRepositoryInput[0].imagesUrls)
    expect(products[0].quantity).toBe(addProductsRepositoryInput[0].quantity)
    expect(products[0].createdAt).toEqual(addProductsRepositoryInput[0].createdAt)
    expect(products[0].updatedAt).toEqual(addProductsRepositoryInput[0].updatedAt)
    expect(currentPage).toBe(defaultPage)
    expect(totalPages).toBe(defaultPage)
    expect(totalItems).toBe(1)
  })

  test('Should return only the limit of products of pagination', async() => {
    const commonCategory = mockAddProductRepositoryInput().category
    const addProductsRepositoryInput = Array.from({ length: defaultLength }, () => {
      const addProductRepositoryInput = mockAddProductRepositoryInput()
      return { ...addProductRepositoryInput, category: commonCategory }
    })
    await productCollection.insertMany(addProductsRepositoryInput)
    const sut = makeSut()
    const { products } = await sut.getByCategory(commonCategory, defaultPage, randomLimit)
    expect(products.length).toBe(randomLimit)
  })

  test('Should return an empty list if there are no products', async() => {
    const sut = makeSut()
    const { products, currentPage, totalPages, totalItems } = await sut.getByCategory(mockAddProductRepositoryInput().category, defaultPage, randomLimit)
    expect(products.length).toBe(0)
    expect(currentPage).toBe(defaultPage)
    expect(totalPages).toBe(defaultPage)
    expect(totalItems).toBe(0)
  })
})
