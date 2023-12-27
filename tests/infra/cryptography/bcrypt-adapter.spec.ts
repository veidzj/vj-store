import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra/cryptography'

describe('BcryptAdapter', () => {
  test('Should call hash with correct values', async() => {
    const sut = new BcryptAdapter(12)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Should throw if hash throws', async() => {
    const sut = new BcryptAdapter(12)
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
