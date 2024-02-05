import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddCategoryRepositoryInput } from '@/tests/application/mocks/category/commands'
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
    categoryCollection = await getCollection('categories')
    await clearCollection(categoryCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
    const promise = sut.getAll()
    await expect(promise).rejects.toThrow()
  })

  test('Should return an empty array if there are no categories', async() => {
    const categories = await sut.getAll()
    expect(categories).toEqual([])
  })

  test('Should return all categories on success', async() => {
    const addCategoryRepositoryInputs = [mockAddCategoryRepositoryInput(), mockAddCategoryRepositoryInput()]
    await categoryCollection.insertMany(addCategoryRepositoryInputs)
    const categories = await sut.getAll()
    expect(categories.length).toBe(2)
    expect(categories[0].id).toBe(addCategoryRepositoryInputs[0].id)
    expect(categories[0].name).toBe(addCategoryRepositoryInputs[0].name)
    expect(categories[1].id).toBe(addCategoryRepositoryInputs[1].id)
    expect(categories[1].name).toBe(addCategoryRepositoryInputs[1].name)
  })
})
