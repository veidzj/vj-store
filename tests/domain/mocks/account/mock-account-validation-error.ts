import { AccountValidation } from '@/domain/entities/account'

export const mockUsernameValidationToThrow = (): void => {
  jest.spyOn(AccountValidation, 'validateUsername').mockImplementationOnce(() => {
    throw new Error()
  })
}

export const mockEmailValidationToThrow = (): void => {
  jest.spyOn(AccountValidation, 'validateEmail').mockImplementationOnce(() => {
    throw new Error()
  })
}

export const mockPasswordValidationToThrow = (): void => {
  jest.spyOn(AccountValidation, 'validatePassword').mockImplementationOnce(() => {
    throw new Error()
  })
}
