import { Collection, ObjectId } from 'mongodb'
import { faker } from '@faker-js/faker'

import { mockAddProductInput, throwError } from '@/tests/domain/mocks'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'
import { MongoHelper } from '@/infra/db/mongodb'
import { env } from '@/main/config'

let productCollection: Collection

const makeSut = (): StaticProductMongoRepository => {
  return new StaticProductMongoRepository()
}

describe('StaticProductMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    productCollection = MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
  })

  describe('checkById', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(throwError)
      const promise = sut.checkById(new ObjectId().toHexString())
      await expect(promise).rejects.toThrow()
    })

    test('Should return false if there is no product with the given id', async() => {
      const sut = makeSut()
      const productExists = await sut.checkById(new ObjectId().toHexString())
      expect(productExists).toBe(false)
    })

    test('Should return true on success', async() => {
      const addProductInput = mockAddProductInput()
      const insertQuery = await productCollection.insertOne(addProductInput)
      const sut = makeSut()
      const productExists = await sut.checkById(insertQuery.insertedId.toHexString())
      expect(productExists).toBe(true)
    })
  })

  describe('getAll', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
      const promise = sut.getAll()
      await expect(promise).rejects.toThrow()
    })

    test('Should return an empty list if there are no products', async() => {
      const sut = makeSut()
      const products = await sut.getAll()
      expect(products.length).toBe(0)
    })

    test('Should return all products on success', async() => {
      const addProductsInput = [mockAddProductInput(), mockAddProductInput()]
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getAll()
      expect(products[0].id).toBeTruthy()
      expect(products[0].name).toBe(addProductsInput[0].name)
      expect(products[0].description).toBe(addProductsInput[0].description)
      expect(products[0].price).toBe(addProductsInput[0].price)
      expect(products[0].discountPercentage).toBe(addProductsInput[0].discountPercentage)
      expect(products[0].category).toBe(addProductsInput[0].category)
      expect(products[0].imageUrls).toEqual(addProductsInput[0].imageUrls)
      expect(products[0].quantity).toBe(addProductsInput[0].quantity)
      expect(products[1].id).toBeTruthy()
      expect(products[1].name).toBe(addProductsInput[1].name)
      expect(products[1].description).toBe(addProductsInput[1].description)
      expect(products[1].price).toBe(addProductsInput[1].price)
      expect(products[1].discountPercentage).toBe(addProductsInput[1].discountPercentage)
      expect(products[1].category).toBe(addProductsInput[1].category)
      expect(products[1].imageUrls).toEqual(addProductsInput[1].imageUrls)
      expect(products[1].quantity).toBe(addProductsInput[1].quantity)
    })

    test('Should return only the first 25 products if there are more than 25 on database', async() => {
      const addProductsInput = Array.from({ length: 30 }, () => mockAddProductInput())
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getAll()
      expect(products.length).toBe(25)
    })

    test('Should return only the products of the given page', async() => {
      const addProductsInput = Array.from({ length: 30 }, () => mockAddProductInput())
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getAll(2)
      expect(products.length).toBe(5)
    })
  })

  describe('getByCategory', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
      const promise = sut.getByCategory(faker.word.words())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('getBySlug', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(throwError)
      const promise = sut.getBySlug(faker.word.words())
      await expect(promise).rejects.toThrow()
    })

    test('Should return null if there is no product with the given slug', async() => {
      const sut = makeSut()
      const product = await sut.getBySlug(faker.word.words())
      expect(product).toBeNull()
    })

    test('Should return a product on success', async() => {
      const slug = faker.word.words()
      const addProductInput = { ...mockAddProductInput(), slug }
      await productCollection.insertOne(addProductInput)
      const sut = makeSut()
      const product = await sut.getBySlug(slug)
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
