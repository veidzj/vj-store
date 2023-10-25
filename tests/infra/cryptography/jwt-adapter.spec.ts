import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/cryptography/jwt-adapter'
import { throwError } from '../../domain/mocks/test-helper'

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JwtAdapter', () => {
  describe('sign', () => {
    test('Should call sign with correct values', async() => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenLastCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should throw if sign throws', async() => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
