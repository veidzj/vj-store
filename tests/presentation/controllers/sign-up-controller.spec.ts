import { ValidationSpy } from '../mocks/mock-validation'
import { SignUpController } from '../../../src/presentation/controllers/sign-up-controller'
import { MissingParamError } from '../../../src/presentation/errors/missing-param-error'

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

describe('SignUpController', () => {
  test('Should call Validation with correct values', async() => {
    const { sut, validationSpy } = makeSut()
    const request = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return Bad Request if Validation returns an error', async() => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError('name')
    const request = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new MissingParamError('name')
    })
  })
})
