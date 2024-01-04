import { faker } from '@faker-js/faker'

import { Category } from '@/domain/entities/category'

let name: string

const makeSut = (): Category => {
  return new Category(name)
}

describe('Category Entity', () => {
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
})
