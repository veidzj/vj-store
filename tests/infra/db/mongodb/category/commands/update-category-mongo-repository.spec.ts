import MockDate from 'mockdate'
import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getCategoryCollection } from '@/tests/infra/db/mongodb/category'
import { mockUpdateCategoryRepositoryInput } from '@/tests/application/mocks/category/commands'
import { UpdateCategoryMongoRepository } from '@/infra/db/mongodb/category/commands'

let categoryCollection: Collection

const makeSut = (): UpdateCategoryMongoRepository => {
  return new UpdateCategoryMongoRepository()
}

describe('UpdateCategoryMongoRepository', () => {
  const sut = makeSut()

  beforeAll(async() => {
    MockDate.set(new Date())
    await connectToDatabase()
  })

  afterAll(async() => {
    MockDate.reset()
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    categoryCollection = await getCategoryCollection()
    await clearCollection(categoryCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateCategoryRepositoryInput())
    await expect(promise).rejects.toThrow()
  })
})
