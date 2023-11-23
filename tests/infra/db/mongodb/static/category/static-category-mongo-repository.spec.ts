import { Collection } from 'mongodb'
import { throwError } from '@/tests/domain/mocks'
import { StaticCategoryMongoRepository } from '@/infra/db/mongodb/static/category'
import { MongoHelper } from '@/infra/db/mongodb'

let categoryCollection: Collection

const makeSut = (): StaticCategoryMongoRepository => {
  return new StaticCategoryMongoRepository()
}

describe('StaticCategoryMongoRepository', () => {
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

  describe('get', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
      const promise = sut.get()
      await expect(promise).rejects.toThrow()
    })
  })
})
