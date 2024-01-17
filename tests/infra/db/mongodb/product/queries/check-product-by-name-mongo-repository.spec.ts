import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
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
    productCollection = await getProductCollection()
    await clearCollection(productCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'countDocuments').mockImplementationOnce(throwError)
    const promise = sut.checkByName(mockAddProductRepositoryInput().name)
    await expect(promise).rejects.toThrow()
  })
})
