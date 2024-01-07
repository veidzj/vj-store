import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getCategoryCollection } from '@/tests/infra/db/mongodb/category'
import { CheckCategoryByNameMongoRepository } from '@/infra/db/mongodb/category/queries'

let categoryCollection: Collection

const makeSut = (): CheckCategoryByNameMongoRepository => {
  return new CheckCategoryByNameMongoRepository()
}

const makeName = (min: number = 4, max: number = 19): string => {
  const randomString = faker.string.alpha({ length: { min, max }, casing: 'lower' })
  return faker.string.alpha({ length: 1, casing: 'upper' }) + randomString
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
    categoryCollection = await getCategoryCollection()
    await clearCollection(categoryCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'countDocuments').mockImplementationOnce(throwError)
    const promise = sut.checkByName(makeName())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if name does not exists', async() => {
    const categoryExists = await sut.checkByName(makeName())
    expect(categoryExists).toBe(false)
  })
})
