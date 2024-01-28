import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { GetProductsWithDiscountMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): GetProductsWithDiscountMongoRepository => {
  return new GetProductsWithDiscountMongoRepository()
}

const defaultLength: number = 30
const defaultPage: number = 1
const randomLimit: number = faker.number.int({ min: 5, max: 25 })
const noDiscount: number = 0
const lessDiscount: number = faker.number.int({ min: 1, max: 50 })
const moreDiscount: number = faker.number.int({ min: 51, max: 100 })

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

  test('Should return products ordered by most discount percentage', async() => {
    const mockProductWithLessDiscount = { ...mockAddProductRepositoryInput(), discountPercentage: lessDiscount }
    const mockProductWithMoreDiscount = { ...mockAddProductRepositoryInput(), discountPercentage: moreDiscount }
    const addProductsRepositoryInput = [mockProductWithLessDiscount, mockProductWithMoreDiscount]
    await productCollection.insertMany(addProductsRepositoryInput)
    const sut = makeSut()
    const { products } = await sut.getWithDiscount(defaultPage, randomLimit)
    expect(products.length).toBe(2)
    expect(products[0].discountPercentage).toBeGreaterThan(products[1].discountPercentage)
  })

  test('Should return only the limit of products of pagination', async() => {
    const addProductsRepositoryInput = Array.from({ length: defaultLength }, () => mockAddProductRepositoryInput())
    await productCollection.insertMany(addProductsRepositoryInput)
    const sut = makeSut()
    const { products } = await sut.getWithDiscount(defaultPage, randomLimit)
    expect(products.length).toBe(randomLimit)
  })

  test('Should return an empty list if there are no products', async() => {
    const sut = makeSut()
    const { products, currentPage, totalPages, totalItems } = await sut.getWithDiscount(defaultPage, randomLimit)
    expect(products.length).toBe(0)
    expect(currentPage).toBe(defaultPage)
    expect(totalPages).toBe(defaultPage)
    expect(totalItems).toBe(0)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
    const promise = sut.getWithDiscount(defaultPage, randomLimit)
    await expect(promise).rejects.toThrow()
  })
})
