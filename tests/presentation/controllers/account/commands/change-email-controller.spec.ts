import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { ChangeEmailSpy } from '@/tests/presentation/mocks/account'
import { ChangeEmailController } from '@/presentation/controllers/account/commands'
import { HttpHelper } from '@/presentation/helpers'
import { EntityValidationError } from '@/domain/errors'
import { AccountNotFoundError } from '@/domain/errors/account'

interface Sut {
  sut: ChangeEmailController
  changeEmailSpy: ChangeEmailSpy
}

const makeSut = (): Sut => {
  const changeEmailSpy = new ChangeEmailSpy()
  const sut = new ChangeEmailController(changeEmailSpy)
  return {
    sut,
    changeEmailSpy
  }
}

const mockRequest = (): ChangeEmailController.Request => ({
  currentEmail: faker.internet.email(),
  newEmail: faker.internet.email(),
  accountId: faker.string.uuid()
})

describe('ChangeEmailController', () => {
  test('Should call ChangeEmail with correct values', async() => {
    const { sut, changeEmailSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(changeEmailSpy.currentEmail).toBe(request.currentEmail)
    expect(changeEmailSpy.newEmail).toBe(request.newEmail)
  })

  test('Should return badRequest if ChangeEmail throws EntityValidationError', async() => {
    const { sut, changeEmailSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(changeEmailSpy, 'change').mockImplementationOnce(() => {
      throw new EntityValidationError(errorMessage)
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.badRequest(new EntityValidationError(errorMessage)))
  })

  test('Should return notFound if ChangeEmail throws AccountNotFoundError', async() => {
    const { sut, changeEmailSpy } = makeSut()
    jest.spyOn(changeEmailSpy, 'change').mockImplementationOnce(() => {
      throw new AccountNotFoundError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
  })

  test('Should return serverError if ChangeEmail throws', async() => {
    const { sut, changeEmailSpy } = makeSut()
    jest.spyOn(changeEmailSpy, 'change').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok on success', async() => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok({ message: 'Email successfully changed' }))
  })
})
