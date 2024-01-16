import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { AddProductMongoRepository } from '@/infra/db/mongodb/product/commands'

let productCollection: Collection

const makeSut = (): AddProductMongoRepository => {
  return new AddProductMongoRepository()
}

describe('AddProductMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddProductRepositoryInput())
    await expect(promise).rejects.toThrow()
  })
})
