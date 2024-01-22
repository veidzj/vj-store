import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Account, AccountHelper } from '@/domain/entities/account'
import { EntityValidationError } from '@/domain/errors'

const role: string = 'user'
let username: string
let email: string
let password: string

const makeSut = (): Account => {
  return new Account(username, email, password)
}

const expectPromiseToThrow = (errorMessage: string): void => {
  const sut = (): Account => makeSut()
  expect(sut).toThrow(new EntityValidationError(errorMessage))
}

describe('Account Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    username = AccountHelper.formatUsername(faker.string.alpha({ length: { min: 3, max: 12 } }))
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
    expect(sut.getRole()).toBe(role)
    expect(sut.getIsActive()).toBe(true)
    expect(sut.getCreatedAt()).toEqual(currentDate)
    expect(sut.getUpdatedAt()).toEqual(currentDate)
  })

  test('Should deactivate an active Account', () => {
    const sut = makeSut()
    sut.deactivate()
    expect(sut.getIsActive()).toBe(false)
  })

  test('Should activate an inactive Account', () => {
    const sut = makeSut()
    sut.deactivate()
    sut.activate()
    expect(sut.getIsActive()).toBe(true)
  })

  test('Should change username on setter', () => {
    const sut = makeSut()
    const newUsername = faker.string.alpha({ length: { min: 3, max: 12 } })
    sut.setUsername(newUsername)
    expect(sut.getUsername()).toBe(AccountHelper.formatUsername(newUsername))
  })

  test('Should change email on setter', () => {
    const sut = makeSut()
    const newEmail = faker.internet.email()
    sut.setEmail(newEmail)
    expect(sut.getEmail()).toBe(newEmail)
  })

  test('Should change password on setter', () => {
    const sut = makeSut()
    const newPassword = faker.internet.password()
    sut.setPassword(newPassword)
    expect(sut.getPassword()).toBe(newPassword)
  })

  test('Should throw if username is less than 3 characters long', () => {
    username = faker.string.alpha({ length: { min: 1, max: 2 } })
    const errorMessage = 'Username must be at least 3 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if username is greater than 12 characters long', () => {
    username = faker.string.alpha({ length: { min: 13, max: 255 } })
    const errorMessage = 'Username must be less than or equal to 12 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if username contains numbers or special characters', () => {
    const randomNumber = faker.number.int(9)
    const randomSymbol = faker.string.symbol()
    username = faker.string.sample({ min: 1, max: 10 }) + randomNumber + randomSymbol
    const errorMessage = 'Username must contain only letters'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if email is invalid', () => {
    email = faker.word.words()
    const errorMessage = 'Email must be valid'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if password is less than 6 characters long', () => {
    password = faker.internet.password({ length: 5 })
    const errorMessage = 'Password must must be at least 6 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if password is greater than 255 characters long', () => {
    password = faker.internet.password({ length: 256 })
    const errorMessage = 'Password must be less than or equal to 255 characters long'
    expectPromiseToThrow(errorMessage)
  })
})
