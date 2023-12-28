import { faker } from '@faker-js/faker'

import { AddAccountSpy, AuthenticationSpy } from '@/tests/presentation/mocks/account'
import { mockAddAccountInput } from '@/tests/domain/mocks/account'
import { SignUpController } from '@/presentation/controllers/account'
import { EntityValidationError } from '@/domain/errors'
import { HttpHelper } from '@/presentation/helpers'

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
