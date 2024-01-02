import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { DecrypterSpy } from '@/tests/application/mocks/cryptography'
import { DbGetAccountIdByToken } from '@/application/usecases/account'
import { TokenError } from '@/domain/errors/account'

interface Sut {
  sut: DbGetAccountIdByToken
  decrypterSpy: DecrypterSpy
}

const makeSut = (): Sut => {
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbGetAccountIdByToken(decrypterSpy)
  return {
    sut,
    decrypterSpy
  }
}

describe('DbGetAccountIdByToken', () => {
  let token: string
  let role: string

  beforeEach(() => {
    token = faker.string.uuid()
    role = faker.word.words()
  })

  describe('Decrypter', () => {
    test('Should call Decrypter with correct value', async() => {
      const { sut, decrypterSpy } = makeSut()
      await sut.getByToken(token, role)
      expect(decrypterSpy.cipherText).toBe(token)
    })

    test('Should throw TokenError if Decrypter throws', async() => {
      const { sut, decrypterSpy } = makeSut()
      jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
      const promise = sut.getByToken(token, role)
      await expect(promise).rejects.toThrow(new TokenError())
    })
  })
})
