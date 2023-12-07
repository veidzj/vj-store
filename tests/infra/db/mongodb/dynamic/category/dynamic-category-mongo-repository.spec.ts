import { Collection } from 'mongodb'

import { mockAddCategoryInput, throwError } from '@/tests/domain/mocks'
import { MongoHelper } from '@/infra/db/mongodb'
import { DynamicCategoryMongoRepository } from '@/infra/db/mongodb/dynamic/category'
import { env } from '@/main/config'

let categoryCollection: Collection

const makeSut = (): DynamicCategoryMongoRepository => {
  return new DynamicCategoryMongoRepository()
}

describe('DynamicCategoryMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    categoryCollection = MongoHelper.getCollection('categories')
    await categoryCollection.deleteMany({})
  })

  describe('add', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddCategoryInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should add a category on success', async() => {
      const sut = makeSut()
      await sut.add(mockAddCategoryInput())
      const count = await categoryCollection.countDocuments()
      expect(count).toBe(1)
    })
  })
})
