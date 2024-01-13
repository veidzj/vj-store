import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Product, ProductFields, ProductHelper } from '@/domain/entities/product'
import { EntityValidationError } from '@/domain/errors'

let name: string
let description: string
let price: number
let discountPercentage: number
let quantity: number
let category: string
let imagesUrls: string[]

const makeSut = (): Product => {
  return new Product(name, description, price, discountPercentage, quantity, category, imagesUrls)
}

const expectPromiseToThrow = (errorMessage: string): void => {
  const sut = (): Product => makeSut()
  expect(sut).toThrow(new EntityValidationError(errorMessage))
}

describe('Product Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    name = faker.string.alpha({ length: { min: 3, max: 20 } })
    description = faker.string.alpha({ length: { min: 50, max: 300 } })
    price = faker.number.int({ min: 1, max: 99999 })
    discountPercentage = faker.number.int({ min: 0, max: 100 })
    quantity = faker.number.int({ min: 0, max: 999 })
    category = faker.commerce.department()
    imagesUrls = [faker.internet.url(), faker.internet.url()]
  })

  test('Should instantiate with correct values', () => {
    const currentDate = new Date()
    const sut = makeSut()
    expect(sut.getId()).toBeTruthy()
    expect(sut.getName()).toBe(name)
    expect(sut.getDescription()).toBe(description)
    expect(sut.getPrice()).toBe(price)
    expect(sut.getDiscountPercentage()).toBe(discountPercentage)
    expect(sut.getQuantity()).toBe(quantity)
    expect(sut.getCategory()).toBe(category)
    expect(sut.getSlug()).toBe(ProductHelper.generateSlug(name))
    expect(sut.getImagesUrls()).toEqual(imagesUrls)
    expect(sut.getCreatedAt()).toEqual(currentDate)
    expect(sut.getUpdateHistory()).toEqual([])
  })

  test('Should change name on setter', () => {
    const sut = makeSut()
    const newName = faker.string.alpha({ length: { min: 3, max: 20 } })
    sut.setName(newName)
    expect(sut.getName()).toBe(newName)
  })

  test('Should change description on setter', () => {
    const sut = makeSut()
    const newDescription = faker.commerce.productDescription()
    sut.setDescription(newDescription)
    expect(sut.getDescription()).toBe(newDescription)
  })

  test('Should change price on setter', () => {
    const sut = makeSut()
    const newPrice = faker.number.int({ min: 1, max: 99999 })
    sut.setPrice(newPrice)
    expect(sut.getPrice()).toBe(newPrice)
  })

  test('Should change discount percentage on setter', () => {
    const sut = makeSut()
    const newDiscountPercentage = faker.number.int({ min: 0, max: 100 })
    sut.setDiscountPercentage(newDiscountPercentage)
    expect(sut.getDiscountPercentage()).toBe(newDiscountPercentage)
  })

  test('Should change quantity on setter', () => {
    const sut = makeSut()
    const newQuantity = faker.number.int({ min: 0, max: 999 })
    sut.setQuantity(newQuantity)
    expect(sut.getQuantity()).toBe(newQuantity)
  })

  test('Should change category on setter', () => {
    const sut = makeSut()
    const newCategory = faker.commerce.department()
    sut.setCategory(newCategory)
    expect(sut.getCategory()).toBe(newCategory)
  })

  test('Should change images urls on setter', () => {
    const sut = makeSut()
    const newImagesUrls = [faker.internet.url(), faker.internet.url()]
    sut.setImagesUrls(newImagesUrls)
    expect(sut.getImagesUrls()).toBe(newImagesUrls)
  })

  test('Should change update history on setter', () => {
    const sut = makeSut()
    const productFields: ProductFields[] = [ProductFields.name]
    sut.setUpdateHistory(productFields)
    expect(sut.getUpdateHistory()).toEqual({
      fields: productFields,
      updatedAt: new Date()
    })
  })

  test('Should throw if name is less than 3 characters long', () => {
    name = faker.string.alpha({ length: { min: 1, max: 2 } })
    const errorMessage = 'Name must be at least 3 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if name is greater than 20 characters long', () => {
    name = faker.string.alpha({ length: { min: 21, max: 22 } })
    const errorMessage = 'Name must be less than or equal to 20 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if name contains special characters', () => {
    const randomString = faker.string.sample({ min: 4, max: 19 })
    name = faker.string.symbol() + randomString
    const errorMessage = 'Name must contain only letters, numbers and spaces'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if description is less than 50 characters long', () => {
    description = faker.string.alpha({ length: { min: 1, max: 49 } })
    const errorMessage = 'Description must be at least 50 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if description is greater than 300 characters long', () => {
    description = faker.string.alpha({ length: { min: 301, max: 302 } })
    const errorMessage = 'Description must be less than or equal to 300 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if image url is invalid', () => {
    imagesUrls = [faker.string.sample()]
    const errorMessage = 'Image url must be a valid url'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if price is less than 1', () => {
    price = faker.number.int({ max: 0 })
    const errorMessage = 'Price must be at least $1'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if price is greater than 99.999', () => {
    price = faker.number.int({ min: 100000, max: 100001 })
    const errorMessage = 'Price must be less than or equal to $99.999'
    expectPromiseToThrow(errorMessage)
  })
})
