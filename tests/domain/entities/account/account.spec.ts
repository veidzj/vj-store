import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Account } from '@/domain/entities/account'

let username: string
let email: string
let password: string

const makeSut = (): Account => {
  return new Account(username, email, password)
}

describe('Account Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    username = faker.internet.userName()
    email = faker.internet.email()
    password = faker.internet.password()
  })

  test('Should instantiate with correct values', () => {
    const currentDate = new Date()
    const sut = makeSut()

    expect(sut.getId()).toBeTruthy()
    expect(sut.getUsername()).toBe(username)
    expect(sut.getEmail()).toBe(email)
    expect(sut.getPassword()).toBe(password)
    expect(sut.isActive()).toBe(true)
    expect(sut.getCreatedAt()).toEqual(currentDate)
    expect(sut.getUpdateHistory()).toBeNull()
  })

  test('Should deactivate an active Account', () => {
    const sut = makeSut()

    sut.deactivate()

    expect(sut.isActive()).toBe(false)
  })

  test('Should activate an inactive Account', () => {
    const sut = makeSut()

    sut.deactivate()
    sut.activate()

    expect(sut.isActive()).toBe(true)
  })

  test('Should change Username on setter', () => {
    const sut = makeSut()
    const newUsername = faker.internet.userName()

    sut.setUsername(newUsername)

    expect(sut.getUsername()).toBe(newUsername)
  })
})
