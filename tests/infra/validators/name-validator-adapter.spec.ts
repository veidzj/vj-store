import validator from 'validator'
import { NameValidatorAdapter } from '@/infra/validators/name-validator-adapter'

jest.mock('validator', () => ({
  isAlpha(): boolean {
    return true
  }
}))

const makeSut = (): NameValidatorAdapter => {
  return new NameValidatorAdapter()
}

describe('NameValidatorAdapter', () => {
  test('Should call validator with correct name', () => {
    const sut = makeSut()
    const isAlphaSpy = jest.spyOn(validator, 'isAlpha')
    sut.isValid('any_name')
    expect(isAlphaSpy).toHaveBeenCalledWith('any_name')
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isAlpha').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_name')
    expect(isValid).toBe(false)
  })
})
