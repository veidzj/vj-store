import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'
import { throwError } from '@/tests/domain/mocks'
import { MongoHelper } from '@/infra/db/mongodb'
import { DynamicProductMongoRepository } from '@/infra/db/mongodb/dynamic/product'
import { type AddProductRepository } from '@/application/protocols/db/dynamic/product'

let productCollection: Collection

const makeSut = (): DynamicProductMongoRepository => {
  return new DynamicProductMongoRepository()
}

const mockAddProductRepositoryInput = (): AddProductRepository.Input => ({
  name: faker.word.words(),
  description: faker.word.words(),
  price: faker.number.int(1000),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  category: faker.word.words(),
  imageUrls: [faker.internet.url(), faker.internet.url()],
  quantity: faker.number.int(100),
  slug: faker.word.words()
})

describe('DynamicProductMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    productCollection = MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
  })

  describe('add', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddProductRepositoryInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should add an Product on success', async() => {
      const sut = makeSut()
      await sut.add(mockAddProductRepositoryInput())
      const count = await productCollection.countDocuments()
      expect(count).toBe(1)
    })
  })
})
