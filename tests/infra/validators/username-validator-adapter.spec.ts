import validator from 'validator'
import { faker } from '@faker-js/faker'

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
    const username = faker.person.firstName()
    sut.isValid(username)
    expect(isAlphaSpy).toHaveBeenCalledWith(username)
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isAlpha').mockReturnValueOnce(false)
    const isValid = sut.isValid(faker.person.firstName())
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(faker.person.firstName())
    expect(isValid).toBe(true)
  })
})
