import { Collection, ObjectId } from 'mongodb'
import { faker } from '@faker-js/faker'

import { mockAddProductInput, throwError } from '@/tests/domain/mocks'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'
import { MongoHelper } from '@/infra/db/mongodb'
import { env } from '@/main/config'

const mongoInvalidId: string = faker.word.words()
const defaultLength: number = 30
const randomCategory: string = faker.word.words()
const randomDate: Date = faker.date.anytime()
const defaultPage: number = 1
const defaultLimit: number = 25
const randomLimit: number = faker.number.int({ min: 5, max: 25 })
const latest: string = 'latest'
const discount: string = 'discount'
const noDiscount: number = 0
const lessDiscount: number = 25
const moreDiscount: number = 50

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

    test('Should return false if mongo throws a BSONError', async() => {
      const sut = makeSut()
      const productExists = await sut.checkById(mongoInvalidId)
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

  describe('getByCategory', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
      const promise = sut.getByCategory(randomCategory)
      await expect(promise).rejects.toThrow()
    })

    test('Should return an empty list if there are no products', async() => {
      const sut = makeSut()
      const products = await sut.getByCategory(randomCategory)
      expect(products.length).toBe(0)
    })

    test('Should return all products on success', async() => {
      const addProductsInput = [mockAddProductInput(), mockAddProductInput()]
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getByCategory(addProductsInput[0].category)
      expect(products.length).toBe(1)
      expect(products[0].id).toBeTruthy()
      expect(products[0].name).toBe(addProductsInput[0].name)
      expect(products[0].description).toBe(addProductsInput[0].description)
      expect(products[0].price).toBe(addProductsInput[0].price)
      expect(products[0].discountPercentage).toBe(addProductsInput[0].discountPercentage)
      expect(products[0].category).toBe(addProductsInput[0].category)
      expect(products[0].imageUrls).toEqual(addProductsInput[0].imageUrls)
      expect(products[0].quantity).toBe(addProductsInput[0].quantity)
    })

    test('Should return only the first 25 products if there are more than 25 on database', async() => {
      const commonCategory = mockAddProductInput().category
      const addProductsInput = Array.from({ length: defaultLength }, () => {
        const addProductInput = mockAddProductInput()
        return { ...addProductInput, category: commonCategory }
      })
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getByCategory(commonCategory)
      expect(products.length).toBe(defaultLimit)
    })

    test('Should return all products ordered by `latest`', async() => {
      const commonCategory = mockAddProductInput().category
      const addProductsInput = Array.from({ length: defaultLength }, () => {
        const addProductInput = mockAddProductInput()
        return { ...addProductInput, category: commonCategory, addedAt: randomDate }
      })
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getByCategory(commonCategory, defaultPage, defaultLimit, latest)
      for (let i = 0; i < products.length - 1; i++) {
        expect(products[i].addedAt.getTime()).toBeGreaterThanOrEqual(products[i + 1].addedAt.getTime())
      }
    })

    test('Should return all products ordered by `discount`', async() => {
      const commonCategory = mockAddProductInput().category
      const addProductsInput = Array.from({ length: defaultLength }, () => {
        const addProductInput = mockAddProductInput()
        return { ...addProductInput, category: commonCategory }
      })
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getByCategory(commonCategory, defaultPage, defaultLimit, discount)
      for (let i = 0; i < products.length - 1; i++) {
        expect(products[i].discountPercentage).toBeGreaterThanOrEqual(products[i + 1].discountPercentage)
      }
    })

    test('Should return only the limit of products if pagination is provided', async() => {
      const commonCategory = mockAddProductInput().category
      const addProductsInput = Array.from({ length: defaultLength }, () => {
        const addProductInput = mockAddProductInput()
        return { ...addProductInput, category: commonCategory }
      })
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getByCategory(commonCategory, 1, 5)
      expect(products.length).toBe(5)
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

  describe('getWithDiscount', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
      const promise = sut.getWithDiscount()
      await expect(promise).rejects.toThrow()
    })

    test('Should return an empty list if there are no products', async() => {
      const sut = makeSut()
      const products = await sut.getWithDiscount()
      expect(products.length).toBe(0)
    })

    test('Should return all products with discount on success', async() => {
      const mockProductWithNoDiscount = { ...mockAddProductInput(), discountPercentage: noDiscount }
      const mockProductWithDiscount = { ...mockAddProductInput(), discountPercentage: moreDiscount }
      const addProductsInput = [mockProductWithNoDiscount, mockProductWithDiscount]
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getWithDiscount()
      expect(products.length).toBe(1)
      expect(products[0].id).toBeTruthy()
      expect(products[0].name).toBe(mockProductWithDiscount.name)
      expect(products[0].description).toBe(mockProductWithDiscount.description)
      expect(products[0].price).toBe(mockProductWithDiscount.price)
      expect(products[0].discountPercentage).toBe(mockProductWithDiscount.discountPercentage)
      expect(products[0].category).toBe(mockProductWithDiscount.category)
      expect(products[0].imageUrls).toEqual(mockProductWithDiscount.imageUrls)
      expect(products[0].quantity).toBe(mockProductWithDiscount.quantity)
    })

    test('Should return only the first 25 products if there are more than 25 on database', async() => {
      const addProductsInput = Array.from({ length: defaultLength }, () => {
        const addProductInput = mockAddProductInput()
        return { ...addProductInput, discountPercentage: moreDiscount }
      })
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getWithDiscount()
      expect(products.length).toBe(defaultLimit)
    })

    test('Should return only the limit of products if pagination is provided', async() => {
      const addProductsInput = Array.from({ length: defaultLength }, () => {
        const addProductInput = mockAddProductInput()
        return { ...addProductInput, discountPercentage: moreDiscount }
      })
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getWithDiscount(1, 5)
      expect(products.length).toBe(5)
    })

    test('Should return products ordered by most discount percentage', async() => {
      const mockProductWithLess = { ...mockAddProductInput(), discountPercentage: lessDiscount }
      const mockProductWithMoreDiscount = { ...mockAddProductInput(), discountPercentage: moreDiscount }
      const addProductsInput = [mockProductWithLess, mockProductWithMoreDiscount]
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getWithDiscount()
      expect(products.length).toBe(2)
      expect(products[0].discountPercentage).toBeGreaterThan(products[1].discountPercentage)
    })
  })

  describe('getLatest', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'find').mockImplementationOnce(throwError)
      const promise = sut.getLatest()
      await expect(promise).rejects.toThrow()
    })

    test('Should return an empty list if there are no products', async() => {
      const sut = makeSut()
      const products = await sut.getLatest()
      expect(products.length).toBe(0)
    })

    test('Should return only the first 25 products if there are more than 25 on database', async() => {
      const addProductsInput = Array.from({ length: defaultLength }, () => mockAddProductInput())
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getLatest()
      expect(products.length).toBe(defaultLimit)
    })

    test('Should return only the limit of products if pagination is provided', async() => {
      const addProductsInput = Array.from({ length: defaultLength }, () => mockAddProductInput())
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getLatest(defaultPage, randomLimit)
      expect(products.length).toBe(randomLimit)
    })

    test('Should return all products ordered by most recent', async() => {
      const addProductsInput = Array.from({ length: defaultLength }, () => {
        const addProductInput = mockAddProductInput()
        return { ...addProductInput, addedAt: randomDate }
      })
      await productCollection.insertMany(addProductsInput)
      const sut = makeSut()
      const products = await sut.getLatest()
      for (let i = 0; i < products.length - 1; i++) {
        expect(products[i].addedAt.getTime()).toBeGreaterThanOrEqual(products[i + 1].addedAt.getTime())
      }
    })
  })
})
