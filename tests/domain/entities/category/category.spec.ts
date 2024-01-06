import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Category, CategoryFields } from '@/domain/entities/category'
import { EntityValidationError } from '@/domain/errors'

let name: string

const makeSut = (): Category => {
  return new Category(name)
}

const makeName = (min: number = 4, max: number = 19): string => {
  const randomString = faker.string.alpha({ length: { min, max } })
  return faker.string.alpha({ length: 1, casing: 'upper' }) + randomString
}

const expectPromiseToThrow = (errorMessage: string): void => {
  const sut = (): Category => makeSut()
  expect(sut).toThrow(new EntityValidationError(errorMessage))
}

describe('Category Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    name = makeName()
  })

  test('Should instantiate with correct values', () => {
    const currentDate = new Date()
    const sut = makeSut()
    expect(sut.getId()).toBeTruthy()
    expect(sut.getName()).toBe(name)
    expect(sut.getCreatedAt()).toEqual(currentDate)
    expect(sut.getUpdateHistory()).toEqual([])
  })

  test('Should change name on setter', () => {
    const sut = makeSut()
    const newName = makeName()
    sut.setName(newName)
    expect(sut.getName()).toBe(newName)
  })

  test('Should change updateHistory on setter', () => {
    const sut = makeSut()
    const categoryFields: CategoryFields[] = [CategoryFields.name]
    sut.setUpdateHistory(categoryFields)
    expect(sut.getUpdateHistory()).toEqual({
      fields: categoryFields,
      updatedAt: new Date()
    })
  })

  test('Should throw if name is less than 3 characters long', () => {
    name = makeName(0, 1)
    const errorMessage = 'Name must be at least 3 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if name is more than 20 characters long', () => {
    name = makeName(20, 21)
    const errorMessage = 'Name must be less than or equal to 20 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if name starts with a lowercase letter', () => {
    const randomString = faker.string.alpha({ length: { min: 4, max: 19 } })
    name = faker.string.alpha({ length: 1, casing: 'lower' }) + randomString
    const errorMessage = 'Name must start with an uppercase letter'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if name contains numbers or special characters', () => {
    const randomString = faker.string.sample({ min: 4, max: 19 })
    name = faker.string.alpha({ length: 1, casing: 'upper' }) + randomString
    const errorMessage = 'Name must contain only letters'
    expectPromiseToThrow(errorMessage)
  })
})
