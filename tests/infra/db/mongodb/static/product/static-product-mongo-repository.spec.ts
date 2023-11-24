import { Collection, ObjectId } from 'mongodb'
import { mockAddProductInput, throwError } from '@/tests/domain/mocks'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'
import { MongoHelper } from '@/infra/db/mongodb'

let productCollection: Collection

const makeSut = (): StaticProductMongoRepository => {
  return new StaticProductMongoRepository()
}

describe('StaticProductMongoRepository', () => {
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

  describe('getById', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(throwError)
      const promise = sut.getById(new ObjectId().toHexString())
      await expect(promise).rejects.toThrow()
    })

    test('Should return a product on success', async() => {
      const addProductInput = mockAddProductInput()
      const insertQuery = await productCollection.insertOne(addProductInput)
      const sut = makeSut()
      const product = await sut.getById(insertQuery.insertedId.toHexString())
      expect(product?.id).toBeTruthy()
      expect(product?.name).toBe(addProductInput.name)
      expect(product?.description).toBe(addProductInput.description)
      expect(product?.price).toBe(addProductInput.price)
      expect(product?.discountPercentage).toBe(addProductInput.discountPercentage)
      expect(product?.category).toBe(addProductInput.category)
      expect(product?.imageUrls).toEqual(addProductInput.imageUrls)
      expect(product?.quantity).toBe(addProductInput.quantity)
    })
  })
})
