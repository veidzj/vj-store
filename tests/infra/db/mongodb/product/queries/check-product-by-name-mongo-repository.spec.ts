import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { CheckProductByNameMongoRepository } from '@/infra/db/mongodb/product/queries'

let productCollection: Collection

const makeSut = (): CheckProductByNameMongoRepository => {
  return new CheckProductByNameMongoRepository()
}

describe('CheckProductByNameMongoRepository', () => {
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
    const promise = sut.checkByName(mockAddProductRepositoryInput().name)
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if name exists', async() => {
    const addProductRepositoryInput = mockAddProductRepositoryInput()
    await productCollection.insertOne(addProductRepositoryInput)
    const productExists = await sut.checkByName(addProductRepositoryInput.name)
    expect(productExists).toBe(true)
  })

  test('Should return false if id does not exists', async() => {
    const productExists = await sut.checkByName(mockAddProductRepositoryInput().name)
    expect(productExists).toBe(false)
  })
})
