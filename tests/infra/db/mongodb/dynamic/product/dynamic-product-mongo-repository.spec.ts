import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { mockProduct, mockUpdateProductInput, throwError } from '@/tests/domain/mocks'
import { MongoHelper } from '@/infra/db/mongodb'
import { DynamicProductMongoRepository } from '@/infra/db/mongodb/dynamic/product'
import { type UpdateProductRepository, type AddProductRepository } from '@/application/protocols/db/dynamic/product'
import { ProductHelper } from '@/application/helpers'
import { env } from '@/main/config'

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
  slug: faker.word.words(),
  addedAt: faker.date.recent()
})

const mockUpdateProductRepositoryInput = (): UpdateProductRepository.Input => ({
  id: faker.string.uuid(),
  name: faker.word.words(),
  description: faker.word.words(),
  price: faker.number.int(1000),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  category: faker.word.words(),
  imageUrls: [faker.internet.url(), faker.internet.url()],
  quantity: faker.number.int(100),
  slug: faker.word.words(),
  updatedAt: faker.date.recent()
})

describe('DynamicProductMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    productCollection = MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
    jest.restoreAllMocks()
  })

  describe('add', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddProductRepositoryInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should add a product on success', async() => {
      const sut = makeSut()
      await sut.add(mockAddProductRepositoryInput())
      const count = await productCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('update', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateProductRepositoryInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should update a product on success', async() => {
      const sut = makeSut()
      const addProductInput = mockProduct()
      const insertQuery = await productCollection.insertOne(addProductInput)
      const updateProductInput = mockUpdateProductInput()
      const updateProductRepositoryInput = { ...updateProductInput, slug: ProductHelper.generateSlug(updateProductInput.name), id: insertQuery.insertedId.toHexString() }
      await sut.update(updateProductRepositoryInput)
      const updatedProduct = await productCollection.findOne({ _id: insertQuery.insertedId })
      expect(updatedProduct?.id).toBe(updateProductRepositoryInput.id)
      expect(updatedProduct?.name).toBe(updateProductRepositoryInput.name)
      expect(updatedProduct?.description).toBe(updateProductRepositoryInput.description)
      expect(updatedProduct?.price).toBe(updateProductRepositoryInput.price)
      expect(updatedProduct?.discountPercentage).toBe(updateProductRepositoryInput.discountPercentage)
      expect(updatedProduct?.category).toBe(updateProductRepositoryInput.category)
      expect(updatedProduct?.imageUrls).toEqual(updateProductRepositoryInput.imageUrls)
      expect(updatedProduct?.quantity).toBe(updateProductRepositoryInput.quantity)
      expect(updatedProduct?.slug).toBe(updateProductRepositoryInput.slug)
    })
  })
})
