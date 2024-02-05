import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { ChangeAccountPasswordSpy } from '@/tests/presentation/mocks/account'
import { ChangeAccountPasswordController } from '@/presentation/controllers/account/commands'
import { HttpHelper } from '@/presentation/helpers'
import { EntityValidationError } from '@/domain/errors'
import { InvalidCredentialsError } from '@/domain/errors/account'

interface Sut {
  sut: ChangeAccountPasswordController
  changeAccountPasswordSpy: ChangeAccountPasswordSpy
}

const makeSut = (): Sut => {
  const changeAccountPasswordSpy = new ChangeAccountPasswordSpy()
  const sut = new ChangeAccountPasswordController(changeAccountPasswordSpy)
  return {
    sut,
    changeAccountPasswordSpy
  }
}

const mockRequest = (): ChangeAccountPasswordController.Request => ({
  accountEmail: faker.internet.email(),
  currentPassword: faker.internet.password(),
  newPassword: faker.internet.password()
})

describe('ChangeAccountPasswordController', () => {
  test('Should call ChangeAccountPassword with correct values', async() => {
    const { sut, changeAccountPasswordSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(changeAccountPasswordSpy.accountEmail).toBe(request.accountEmail)
    expect(changeAccountPasswordSpy.currentPassword).toBe(request.currentPassword)
    expect(changeAccountPasswordSpy.newPassword).toBe(request.newPassword)
  })

  test('Should return badRequest if ChangeAccountPassword throws EntityValidationError', async() => {
    const { sut, changeAccountPasswordSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(changeAccountPasswordSpy, 'changePassword').mockImplementationOnce(() => {
      throw new EntityValidationError(errorMessage)
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.badRequest(new EntityValidationError(errorMessage)))
  })

  test('Should return unauthorized if ChangeAccountPassword throws InvalidCredentialsError', async() => {
    const { sut, changeAccountPasswordSpy } = makeSut()
    jest.spyOn(changeAccountPasswordSpy, 'changePassword').mockImplementationOnce(() => {
      throw new InvalidCredentialsError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })

  test('Should return serverError if ChangeAccountPassword throws', async() => {
    const { sut, changeAccountPasswordSpy } = makeSut()
    jest.spyOn(changeAccountPasswordSpy, 'changePassword').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })
})
