import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddCategoryRepositoryInput } from '@/tests/application/mocks/category/commands'
import { CheckCategoryByNameMongoRepository } from '@/infra/db/mongodb/category/queries'

let categoryCollection: Collection

const makeSut = (): CheckCategoryByNameMongoRepository => {
  return new CheckCategoryByNameMongoRepository()
}

describe('CheckCategoryByNameMongoRepository', () => {
  const sut = makeSut()

  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    categoryCollection = await getCollection('categories')
    await clearCollection(categoryCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'countDocuments').mockImplementationOnce(throwError)
    const promise = sut.checkByName(mockAddCategoryRepositoryInput().name)
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if name exists', async() => {
    const addCategoryRepositoryInput = mockAddCategoryRepositoryInput()
    await categoryCollection.insertOne(addCategoryRepositoryInput)
    const categoryExists = await sut.checkByName(addCategoryRepositoryInput.name)
    expect(categoryExists).toBe(true)
  })

  test('Should return false if name does not exists', async() => {
    const categoryExists = await sut.checkByName(mockAddCategoryRepositoryInput().name)
    expect(categoryExists).toBe(false)
  })
})
