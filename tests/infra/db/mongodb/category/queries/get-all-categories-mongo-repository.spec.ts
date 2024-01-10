import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getCategoryCollection } from '@/tests/infra/db/mongodb/category'
import { GetAllCategoriesMongoRepository } from '@/infra/db/mongodb/category/queries'

let categoryCollection: Collection

const makeSut = (): GetAllCategoriesMongoRepository => {
  return new GetAllCategoriesMongoRepository()
}

describe('GetAllCategoriesMongoRepository', () => {
  const sut = makeSut()

  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    categoryCollection = await getCategoryCollection()
    await clearCollection(categoryCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
    const promise = sut.getAll()
    await expect(promise).rejects.toThrow()
  })
})
