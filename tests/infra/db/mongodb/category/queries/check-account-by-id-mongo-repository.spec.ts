import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getCategoryCollection } from '@/tests/infra/db/mongodb/category'
import { mockAddCategoryRepositoryInput } from '@/tests/application/mocks/category/commands'
import { CheckCategoryByIdMongoRepository } from '@/infra/db/mongodb/category/queries'

let categoryCollection: Collection

const makeSut = (): CheckCategoryByIdMongoRepository => {
  return new CheckCategoryByIdMongoRepository()
}

describe('CheckCategoryByIdMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'countDocuments').mockImplementationOnce(throwError)
    const promise = sut.checkById(mockAddCategoryRepositoryInput().id)
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if id exists', async() => {
    const addCategoryRepositoryInput = mockAddCategoryRepositoryInput()
    await categoryCollection.insertOne(addCategoryRepositoryInput)
    const categoryExists = await sut.checkById(addCategoryRepositoryInput.id)
    expect(categoryExists).toBe(true)
  })

  test('Should return false if id does not exists', async() => {
    const categoryExists = await sut.checkById(mockAddCategoryRepositoryInput().id)
    expect(categoryExists).toBe(false)
  })
})
