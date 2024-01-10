import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Product } from '@/domain/entities/product'

let name: string
let description: string
let price: number
let discountPercentage: number
let quantity: number
let category: string

const makeSut = (): Product => {
  return new Product(name, description, price, discountPercentage, quantity, category)
}

describe('Product Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    name = faker.commerce.productName()
    description = faker.commerce.productDescription()
    price = faker.number.int({ min: 1, max: 99999 })
    discountPercentage = faker.number.int({ min: 0, max: 100 })
    quantity = faker.number.int({ min: 0, max: 999 })
    category = faker.commerce.department()
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
    expect(sut.getImagesUrls()).toEqual([])
    expect(sut.getCreatedAt()).toEqual(currentDate)
    expect(sut.getUpdateHistory()).toEqual([])
  })

  test('Should change name on setter', () => {
    const sut = makeSut()
    const newName = faker.commerce.productName()
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
})
