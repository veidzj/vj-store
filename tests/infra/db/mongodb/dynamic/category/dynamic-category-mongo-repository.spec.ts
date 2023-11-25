import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/domain/mocks'
import { MongoHelper } from '@/infra/db/mongodb'
import { DynamicCategoryMongoRepository } from '@/infra/db/mongodb/dynamic/category'
import { type AddCategoryRepository } from '@/application/protocols/db/dynamic/category'

let categoryCollection: Collection

const makeSut = (): DynamicCategoryMongoRepository => {
  return new DynamicCategoryMongoRepository()
}

const mockAddCategoryRepositoryInput = (): AddCategoryRepository.Input => ({
  name: faker.word.words()
})

describe('DynamicCategoryMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
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
      const promise = sut.add(mockAddCategoryRepositoryInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should add a category on success', async() => {
      const sut = makeSut()
      await sut.add(mockAddCategoryRepositoryInput())
      const count = await categoryCollection.countDocuments()
      expect(count).toBe(1)
    })
  })
})
