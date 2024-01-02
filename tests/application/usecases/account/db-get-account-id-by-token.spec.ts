import { faker } from '@faker-js/faker'

import { DbGetAccountIdByToken } from '@/application/usecases/account'
import { DecrypterSpy } from '@/tests/application/mocks/cryptography'

describe('DbGetAccountIdByToken', () => {
  let token: string
  let role: string

  beforeEach(() => {
    token = faker.string.uuid()
    role = faker.word.words()
  })

  describe('Decrypter', () => {
    test('Should call Decrypter with correct value', async() => {
      const decrypterSpy = new DecrypterSpy()
      const sut = new DbGetAccountIdByToken(decrypterSpy)
      await sut.getByToken(token, role)
      expect(decrypterSpy.cipherText).toBe(token)
    })
  })
})
