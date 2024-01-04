import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Category, CategoryFields } from '@/domain/entities/category'

let name: string

const makeSut = (): Category => {
  return new Category(name)
}

describe('Category Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    const randomString = faker.string.alpha({ length: { min: 4, max: 19 } })
    name = faker.string.alpha({ length: 1, casing: 'upper' }) + randomString
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
    const randomString = faker.string.alpha({ length: { min: 4, max: 19 } })
    const newName = faker.string.alpha({ length: 1, casing: 'upper' }) + randomString
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
})
