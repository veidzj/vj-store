import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Category, CategoryHelper } from '@/domain/entities/category'
import { EntityValidationError } from '@/domain/errors'

let name: string

const makeSut = (): Category => {
  return new Category(name)
}

const makeName = (min: number = 3, max: number = 20): string => {
  return faker.string.alpha({ length: { min, max } })
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
    expect(sut.getName()).toBe(CategoryHelper.formatName(name))
    expect(sut.getCreatedAt()).toEqual(currentDate)
    expect(sut.getUpdatedAt()).toEqual(currentDate)
  })

  test('Should change name on setter', () => {
    const sut = makeSut()
    const newName = makeName()
    sut.setName(newName)
    expect(sut.getName()).toBe(CategoryHelper.formatName(newName))
  })

  test('Should throw if name is less than 3 characters long', () => {
    name = makeName(1, 2)
    const errorMessage = 'Name must be at least 3 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if name is more than 20 characters long', () => {
    name = makeName(21, 22)
    const errorMessage = 'Name must be less than or equal to 20 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if name contains numbers or special characters', () => {
    const randomString = faker.string.sample({ min: 4, max: 19 })
    name = faker.string.alpha({ length: 1 }) + randomString
    const errorMessage = 'Name must contain only letters'
    expectPromiseToThrow(errorMessage)
  })
})
