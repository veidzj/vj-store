import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { Account, AccountFields } from '@/domain/entities/account'
import { EntityValidationError } from '@/domain/errors'

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
    const accountFields = [AccountFields.Username, AccountFields.Email, AccountFields.Password, AccountFields.IsActive]

    sut.setUpdateHistory(accountFields)

    expect(sut.getUpdateHistory()).toEqual({
      Fields: accountFields,
      UpdatedAt: new Date()
    })
  })

  test('Should throw if Username is less than 3 characters', () => {
    username = faker.internet.userName().substring(0, Math.floor(Math.random() * 2) + 1)
    const errorMessage = 'Username should be at least 3 characters long'
    const sut = (): Account => makeSut()

    expect(sut).toThrow(new EntityValidationError(errorMessage))
  })
})
