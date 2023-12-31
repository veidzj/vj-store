import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Account, AccountFields } from '@/domain/entities/account'
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
    username = faker.string.alpha({ length: { min: 3, max: 12 }, casing: 'lower' })
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
    expect(sut.getUpdateHistory()).toEqual([])
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

  test('Should change Username on setter', () => {
    const sut = makeSut()
    const newUsername = faker.string.alpha({ length: { min: 3, max: 12 }, casing: 'lower' })
    sut.setUsername(newUsername)
    expect(sut.getUsername()).toBe(newUsername)
  })

  test('Should change Email on setter', () => {
    const sut = makeSut()
    const newEmail = faker.internet.email()
    sut.setEmail(newEmail)
    expect(sut.getEmail()).toBe(newEmail)
  })

  test('Should change Password on setter', () => {
    const sut = makeSut()
    const newPassword = faker.internet.password()
    sut.setPassword(newPassword)
    expect(sut.getPassword()).toBe(newPassword)
  })

  test('Should change UpdateHistory on setter', () => {
    const sut = makeSut()
    const accountFields: AccountFields[] = [AccountFields.username, AccountFields.email, AccountFields.password, AccountFields.isActive]
    sut.setUpdateHistory(accountFields)
    expect(sut.getUpdateHistory()).toEqual({
      fields: accountFields,
      updatedAt: new Date()
    })
  })

  test('Should throw if Username is less than 3 characters long', () => {
    username = faker.string.alpha({ length: { min: 1, max: 2 }, casing: 'lower' })
    const errorMessage = 'Username must be at least 3 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if Username is greater than 12 characters long', () => {
    username = faker.string.alpha({ length: { min: 13, max: 255 }, casing: 'lower' })
    const errorMessage = 'Username must be less than or equal to 12 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if Username contains numbers or special characters', () => {
    username = faker.string.sample({ min: 3, max: 12 })
    const errorMessage = 'Username must contain only letters'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if Username is not lowercase', () => {
    username = faker.string.alpha({ length: { min: 3, max: 12 } })
    const errorMessage = 'Username must be lowercase'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if Email is invalid', () => {
    email = faker.word.words()
    const errorMessage = 'Email must be valid'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if Password is less than 6 characters long', () => {
    password = faker.internet.password({ length: 5 })
    const errorMessage = 'Password must must be at least 6 characters long'
    expectPromiseToThrow(errorMessage)
  })

  test('Should throw if Password is greater than 255 characters long', () => {
    password = faker.internet.password({ length: 256 })
    const errorMessage = 'Password must be less than or equal to 255 characters long'
    expectPromiseToThrow(errorMessage)
  })
})
