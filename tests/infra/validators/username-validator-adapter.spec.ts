import validator from 'validator'
import { UsernameValidatorAdapter } from '@/infra/validators'

jest.mock('validator', () => ({
  isAlpha(): boolean {
    return true
  },

  isLength(): boolean {
    return true
  }
}))

const makeSut = (): UsernameValidatorAdapter => {
  return new UsernameValidatorAdapter()
}

describe('UsernameValidatorAdapter', () => {
  test('Should call validator with correct username', () => {
    const sut = makeSut()
    const isAlphaSpy = jest.spyOn(validator, 'isAlpha')
    sut.isValid('any_username')
    expect(isAlphaSpy).toHaveBeenCalledWith('any_username')
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isAlpha').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_username')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_username')
    expect(isValid).toBe(true)
  })
})
