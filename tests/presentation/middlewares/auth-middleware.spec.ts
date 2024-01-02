import { AuthMiddleware } from '@/presentation/middlewares'
import { HttpHelper } from '@/presentation/helpers'
import { InvalidCredentialsError } from '@/domain/errors/account'

interface Sut {
  sut: AuthMiddleware
}

const makeSut = (): Sut => {
  const sut = new AuthMiddleware()
  return {
    sut
  }
}

describe('AuthMiddleware', () => {
  test('Should return unauthorized if accessToken is not provided', async() => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })
})
