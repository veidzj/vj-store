import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getCategoryCollection } from '@/tests/infra/db/mongodb/category'
import { mockAddCategoryRepositoryInput } from '@/tests/application/mocks/category/commands'
import { AddCategoryMongoRepository } from '@/infra/db/mongodb/category/commands'

let categoryCollection: Collection

const makeSut = (): AddCategoryMongoRepository => {
  return new AddCategoryMongoRepository()
}

describe('AddCategoryMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCategoryRepositoryInput())
    await expect(promise).rejects.toThrow()
  })
})
