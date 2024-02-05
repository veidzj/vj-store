import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { CheckProductByIdMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): CheckProductByIdMongoRepository => {
  return new CheckProductByIdMongoRepository()
}

describe('CheckProductByIdMongoRepository', () => {
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

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'countDocuments').mockImplementationOnce(throwError)
    const promise = sut.checkById(mockAddProductRepositoryInput().name)
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if id exists', async() => {
    const addProductRepositoryInput = mockAddProductRepositoryInput()
    await productCollection.insertOne(addProductRepositoryInput)
    const productExists = await sut.checkById(addProductRepositoryInput.id)
    expect(productExists).toBe(true)
  })

  test('Should return false if id does not exists', async() => {
    const productExists = await sut.checkById(mockAddProductRepositoryInput().id)
    expect(productExists).toBe(false)
  })
})
