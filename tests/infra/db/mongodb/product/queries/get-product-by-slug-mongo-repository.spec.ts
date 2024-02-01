import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { GetProductBySlugMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): GetProductBySlugMongoRepository => {
  return new GetProductBySlugMongoRepository()
}

describe('GetProductBySlugMongoRepository', () => {
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

  test('Should return a product on success', async() => {
    const addProductRepositoryInput = mockAddProductRepositoryInput()
    await productCollection.insertOne(addProductRepositoryInput)
    const sut = makeSut()
    const product = await sut.getBySlug(addProductRepositoryInput.slug)
    expect(product?.id).toBe(addProductRepositoryInput.id)
    expect(product?.name).toBe(addProductRepositoryInput.name)
    expect(product?.description).toBe(addProductRepositoryInput.description)
    expect(product?.price).toBe(addProductRepositoryInput.price)
    expect(product?.discountPercentage).toBe(addProductRepositoryInput.discountPercentage)
    expect(product?.quantity).toBe(addProductRepositoryInput.quantity)
    expect(product?.category).toBe(addProductRepositoryInput.category)
    expect(product?.slug).toBe(addProductRepositoryInput.slug)
    expect(product?.imagesUrls).toEqual(addProductRepositoryInput.imagesUrls)
    expect(product?.createdAt).toEqual(addProductRepositoryInput.createdAt)
  })

  test('Should return null if there is no product', async() => {
    const sut = makeSut()
    const product = await sut.getBySlug(mockAddProductRepositoryInput().slug)
    expect(product).toBeNull()
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(throwError)
    const promise = sut.getBySlug(mockAddProductRepositoryInput().slug)
    await expect(promise).rejects.toThrow()
  })
})
