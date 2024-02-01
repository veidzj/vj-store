import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { CheckProductBySlugMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): CheckProductBySlugMongoRepository => {
  return new CheckProductBySlugMongoRepository()
}

describe('CheckProductBySlugMongoRepository', () => {
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

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'countDocuments').mockImplementationOnce(throwError)
    const promise = sut.checkBySlug(mockAddProductRepositoryInput().slug)
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if slug exists', async() => {
    const addProductRepositoryInput = mockAddProductRepositoryInput()
    await productCollection.insertOne(addProductRepositoryInput)
    const productExists = await sut.checkBySlug(addProductRepositoryInput.slug)
    expect(productExists).toBe(true)
  })

  test('Should return false if slug does not exists', async() => {
    const productExists = await sut.checkBySlug(mockAddProductRepositoryInput().slug)
    expect(productExists).toBe(false)
  })
})
