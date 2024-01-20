import MockDate from 'mockdate'
import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getCategoryCollection } from '@/tests/infra/db/mongodb/category'
import { mockAddCategoryRepositoryInput, mockUpdateCategoryRepositoryInput } from '@/tests/application/mocks/category/commands'
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

  test('Should update a Category on success', async() => {
    const updateCategoryRepositoryInput = mockUpdateCategoryRepositoryInput()
    const addCategoryRepositoryInput = mockAddCategoryRepositoryInput()
    updateCategoryRepositoryInput.id = addCategoryRepositoryInput.id
    await categoryCollection.insertOne(addCategoryRepositoryInput)
    await sut.update(updateCategoryRepositoryInput)
    const updatedCategory = await categoryCollection.findOne({ id: updateCategoryRepositoryInput.id })
    expect(updatedCategory?.id).toBe(updateCategoryRepositoryInput.id)
    expect(updatedCategory?.name).toBe(updateCategoryRepositoryInput.name)
    expect(updatedCategory?.updatedAt).toEqual(updateCategoryRepositoryInput.updatedAt)
  })
})
