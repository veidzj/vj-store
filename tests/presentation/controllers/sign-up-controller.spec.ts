import { ValidationSpy } from '../mocks/mock-validation'
import { SignUpController } from '../../../src/presentation/controllers/sign-up-controller'

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
})
