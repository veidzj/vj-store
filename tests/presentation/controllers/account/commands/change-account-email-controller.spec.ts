import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { ChangeAccountEmailSpy } from '@/tests/presentation/mocks/account'
import { ChangeAccountEmailController } from '@/presentation/controllers/account/commands'
import { HttpHelper } from '@/presentation/helpers'
import { EntityValidationError } from '@/domain/errors'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'

interface Sut {
  sut: ChangeAccountEmailController
  changeAccountEmailSpy: ChangeAccountEmailSpy
}

const makeSut = (): Sut => {
  const changeAccountEmailSpy = new ChangeAccountEmailSpy()
  const sut = new ChangeAccountEmailController(changeAccountEmailSpy)
  return {
    sut,
    changeAccountEmailSpy
  }
}

const mockRequest = (): ChangeAccountEmailController.Request => {
  const email = faker.internet.email()
  return {
    currentEmail: email,
    newEmail: faker.internet.email(),
    accountEmail: email
  }
}

describe('ChangeAccountEmailController', () => {
  test('Should return unauthorized if currentEmail is not equal to accountEmail', async() => {
    const { sut } = makeSut()
    const request = { ...mockRequest(), accountEmail: faker.internet.email() }
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })

  test('Should call ChangeAccountEmail with correct values', async() => {
    const { sut, changeAccountEmailSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(changeAccountEmailSpy.currentEmail).toBe(request.currentEmail)
    expect(changeAccountEmailSpy.newEmail).toBe(request.newEmail)
  })

  test('Should return badRequest if ChangeAccountEmail throws EntityValidationError', async() => {
    const { sut, changeAccountEmailSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(changeAccountEmailSpy, 'changeEmail').mockImplementationOnce(() => {
      throw new EntityValidationError(errorMessage)
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.badRequest(new EntityValidationError(errorMessage)))
  })

  test('Should return notFound if ChangeAccountEmail throws AccountNotFoundError', async() => {
    const { sut, changeAccountEmailSpy } = makeSut()
    jest.spyOn(changeAccountEmailSpy, 'changeEmail').mockImplementationOnce(() => {
      throw new AccountNotFoundError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
  })

  test('Should return serverError if ChangeAccountEmail throws', async() => {
    const { sut, changeAccountEmailSpy } = makeSut()
    jest.spyOn(changeAccountEmailSpy, 'changeEmail').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok on success', async() => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok({ message: 'Email successfully changed' }))
  })
})
