import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Account } from '@/domain/entities/account'

describe('Account Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should instantiate with correct values', () => {
    const currentDate = new Date()
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const sut = new Account(username, email, password)

    expect(sut.getId()).toBeTruthy()
    expect(sut.getUsername()).toBe(username)
    expect(sut.getEmail()).toBe(email)
    expect(sut.getPassword()).toBe(password)
    expect(sut.isActive()).toBe(true)
    expect(sut.getCreatedAt()).toEqual(currentDate)
    expect(sut.getUpdateHistory()).toEqual([])
  })
})
