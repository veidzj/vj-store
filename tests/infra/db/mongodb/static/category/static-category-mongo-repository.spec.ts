import { Collection } from 'mongodb'
import { mockAddCategoryInput, throwError } from '@/tests/domain/mocks'
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

    test('Should get all categories on success', async() => {
      const addCategoriesModels = [mockAddCategoryInput(), mockAddCategoryInput()]
      await categoryCollection.insertMany(addCategoriesModels)
      const sut = makeSut()
      const categories = await sut.get()
      expect(categories.length).toBe(2)
      expect(categories[0].id).toBeTruthy()
      expect(categories[0].name).toBe(addCategoriesModels[0].name)
      expect(categories[1].id).toBeTruthy()
      expect(categories[1].name).toBe(addCategoriesModels[1].name)
    })
  })
})
