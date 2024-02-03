import { faker } from '@faker-js/faker'

import { ChangeEmailRepositorySpy } from '@/tests/application/mocks/account/commands'
import { DbChangeEmail } from '@/application/usecases/account/commands'
import { EntityValidationError } from '@/domain/errors'
import { throwError } from '@/tests/test-helper'

interface Sut {
  sut: DbChangeEmail
  changeEmailRepositorySpy: ChangeEmailRepositorySpy
}

const makeSut = (): Sut => {
  const changeEmailRepositorySpy = new ChangeEmailRepositorySpy()
  const sut = new DbChangeEmail(changeEmailRepositorySpy)
  return {
    sut,
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
})
