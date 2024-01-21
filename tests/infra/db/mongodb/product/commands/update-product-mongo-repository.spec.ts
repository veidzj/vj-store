import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockUpdateProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { UpdateProductMongoRepository } from '@/infra/db/mongodb/product/commands'

let productCollection: Collection

const makeSut = (): UpdateProductMongoRepository => {
  return new UpdateProductMongoRepository()
}

describe('UpdateProductMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateProductRepositoryInput())
    await expect(promise).rejects.toThrow()
  })
})
