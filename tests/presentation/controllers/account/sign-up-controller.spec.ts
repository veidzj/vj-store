import { faker } from '@faker-js/faker'

import { AddAccountSpy, AuthenticationSpy } from '@/tests/presentation/mocks/account'
import { mockAddAccountInput } from '@/tests/domain/mocks/account'
import { SignUpController } from '@/presentation/controllers/account'
import { HttpHelper } from '@/presentation/helpers'
import { EntityValidationError } from '@/domain/errors'
import { EmailInUseError } from '@/domain/errors/account'

interface Sut {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): Sut => {
  const addAccountSpy = new AddAccountSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(addAccountSpy, authenticationSpy)
  return {
    sut,
    addAccountSpy,
    authenticationSpy
  }
}

const mockRequest = (): SignUpController.Request => mockAddAccountInput()

describe('SignUpController', () => {
  test('Should call AddAccount with correct values', async() => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.input).toEqual(request)
  })

  test('Should return badRequest if AddAccount throws EntityValidationError', async() => {
    const { sut, addAccountSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => {
      throw new EntityValidationError(errorMessage)
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.badRequest(new EntityValidationError(errorMessage)))
  })

  test('Should return conflict if AddAccount throws EmailInUseError', async() => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => {
      throw new EmailInUseError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.conflict(new EmailInUseError()))
  })

  test('Should call Authentication with correct values', async() => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.input).toEqual({
      Email: request.Email,
      Password: request.Password
    })
  })
})
