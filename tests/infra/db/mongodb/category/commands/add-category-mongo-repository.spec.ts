import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
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
    categoryCollection = await getCollection('categories')
    await clearCollection(categoryCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCategoryRepositoryInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should add a Category on success', async() => {
    const addCategoryRepositoryInput = mockAddCategoryRepositoryInput()
    await sut.add(addCategoryRepositoryInput)
    const count = await categoryCollection.countDocuments()
    const account = await categoryCollection.findOne({ name: addCategoryRepositoryInput.name })
    expect(count).toBe(1)
    expect(account?.id).toBe(addCategoryRepositoryInput.id)
    expect(account?.name).toBe(addCategoryRepositoryInput.name)
    expect(account?.createdAt).toEqual(addCategoryRepositoryInput.createdAt)
    expect(account?.updatedAt).toEqual(addCategoryRepositoryInput.updatedAt)
  })
})
