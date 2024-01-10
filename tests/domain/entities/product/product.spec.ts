import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Product } from '@/domain/entities/product'

describe('Product Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should instantiate with correct values', () => {
    const currentDate = new Date()
    const name = faker.commerce.productName()
    const description = faker.commerce.productDescription()
    const price = faker.number.int({ min: 1, max: 99999 })
    const discountPercentage = faker.number.int({ min: 0, max: 100 })
    const quantity = faker.number.int({ min: 0, max: 999 })
    const category = faker.commerce.department()
    const sut = new Product(name, description, price, discountPercentage, quantity, category)
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
})
