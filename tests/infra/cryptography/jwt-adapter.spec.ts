import jwt from 'jsonwebtoken'
import { faker } from '@faker-js/faker'

import { JwtAdapter } from '@/infra/cryptography'

const jwtSecret: string = faker.string.uuid()
const plainText: string = faker.string.uuid()

describe('JwtAdapter', () => {
  describe('Encrypter', () => {
    test('Should call sign with correct values', async() => {
      const sut = new JwtAdapter(jwtSecret)
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(plainText)
      expect(signSpy).toHaveBeenCalledWith({ id: plainText }, jwtSecret, { expiresIn: '1h' })
    })
  })
})
