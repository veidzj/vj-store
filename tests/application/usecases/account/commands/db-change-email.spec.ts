import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { ChangeEmailRepositorySpy } from '@/tests/application/mocks/account/commands'
import { DbChangeEmail } from '@/application/usecases/account/commands'
import { EntityValidationError } from '@/domain/errors'

interface Sut {
  sut: DbChangeEmail
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  changeEmailRepositorySpy: ChangeEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const changeEmailRepositorySpy = new ChangeEmailRepositorySpy()
  const sut = new DbChangeEmail(checkAccountByEmailRepositorySpy, changeEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    changeEmailRepositorySpy
  }
}

describe('DbChangeEmail', () => {
  let invalidEmail: string
  let currentEmail: string
  let newEmail: string

  beforeEach(() => {
    invalidEmail = faker.word.words()
    currentEmail = faker.internet.email()
    newEmail = faker.internet.email()
  })

  test('Should throw EntityValidationError if currentEmail is invalid', async() => {
    const { sut } = makeSut()
    const promise = sut.change(invalidEmail, newEmail)
    await expect(promise).rejects.toThrow(new EntityValidationError('Email must be valid'))
  })

  test('Should throw EntityValidationError if newEmail is invalid', async() => {
    const { sut } = makeSut()
    const promise = sut.change(currentEmail, invalidEmail)
    await expect(promise).rejects.toThrow(new EntityValidationError('Email must be valid'))
  })

  test('Should call CheckAccountByEmailRepository with correct email', async() => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    await sut.change(currentEmail, newEmail)
    expect(checkAccountByEmailRepositorySpy.email).toBe(currentEmail)
  })

  test('Should call ChangeEmailRepository with correct values', async() => {
    const { sut, changeEmailRepositorySpy } = makeSut()
    await sut.change(currentEmail, newEmail)
    expect(changeEmailRepositorySpy.currentEmail).toBe(currentEmail)
    expect(changeEmailRepositorySpy.newEmail).toBe(newEmail)
  })

  test('Should throw if ChangeEmailRepository throws', async() => {
    const { sut, changeEmailRepositorySpy } = makeSut()
    jest.spyOn(changeEmailRepositorySpy, 'change').mockImplementationOnce(throwError)
    const promise = sut.change(currentEmail, newEmail)
    await expect(promise).rejects.toThrow()
  })

  test('Should not throw on success', async() => {
    const { sut } = makeSut()
    const promise = sut.change(currentEmail, newEmail)
    await expect(promise).resolves.not.toThrow()
  })
})
