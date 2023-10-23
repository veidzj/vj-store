import { faker } from '@faker-js/faker'
import { ValidationSpy } from '../mocks/mock-validation'
import { SignUpController } from '../../../src/presentation/controllers/sign-up-controller'
import { MissingParamError } from '../../../src/presentation/errors/missing-param-error'
import { badRequest } from '../../../src/presentation/helpers/http-helper'

interface Sut {
  sut: SignUpController
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

describe('SignUpController', () => {
  test('Should call Validation with correct values', async() => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return Bad Request if Validation returns an error', async() => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.word.words())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
