import { throwError } from '@/tests/test-helper'
import { AccountValidation } from '@/domain/entities/account'

export const mockUsernameValidationToThrow = (): void => {
  jest.spyOn(AccountValidation, 'validateUsername').mockImplementationOnce(throwError)
}

export const mockEmailValidationToThrow = (): void => {
  jest.spyOn(AccountValidation, 'validateEmail').mockImplementationOnce(throwError)
}

export const mockPasswordValidationToThrow = (): void => {
  jest.spyOn(AccountValidation, 'validatePassword').mockImplementationOnce(throwError)
}
