import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
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
    productCollection = await getProductCollection()
    await clearCollection(productCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'countDocuments').mockImplementationOnce(throwError)
    const promise = sut.checkById(mockAddProductRepositoryInput().name)
    await expect(promise).rejects.toThrow()
  })
})
