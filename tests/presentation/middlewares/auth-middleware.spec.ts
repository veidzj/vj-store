import { AutheMiddleware } from '@/presentation/middlewares'
import { HttpHelper } from '@/presentation/helpers'
import { InvalidCredentialsError } from '@/domain/errors/account'

describe('AuthMiddleware', () => {
  test('Should return unauthorized if accessToken is not provided', async() => {
    const sut = new AutheMiddleware()
    const response = await sut.handle({})
    expect(response).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })
})
