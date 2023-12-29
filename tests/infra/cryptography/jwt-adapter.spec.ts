import jwt from 'jsonwebtoken'

import { JwtAdapter } from '@/infra/cryptography'

describe('JwtAdapter', () => {
  describe('Encrypter', () => {
    test('Should call sign with correct values', async() => {
      const sut = new JwtAdapter('jwt_secret')
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('plainText')
      expect(signSpy).toHaveBeenCalledWith({ id: 'plainText' }, 'jwt_secret', { expiresIn: '1h' })
    })
  })
})
