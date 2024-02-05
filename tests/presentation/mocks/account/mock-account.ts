import { faker } from '@faker-js/faker'

import { type AddAccount, type Authentication, type ChangeAccountEmail, type ChangeAccountPassword } from '@/domain/usecases/account/commands'
import { type GetAccountEmailByToken } from '@/domain/usecases/account/queries'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input

  public async add(input: AddAccount.Input): Promise<void> {
    this.input = input
  }
}

export class AuthenticationSpy implements Authentication {
  public input: Authentication.Input
  public output: string = faker.string.uuid()

  public async auth(input: Authentication.Input): Promise<string> {
    this.input = input
    return await Promise.resolve(this.output)
  }
}

export class GetAccountEmailByTokenSpy implements GetAccountEmailByToken {
  public accessToken: string
  public role?: string
  public output = faker.string.uuid()

  public getByToken = async(accessToken: string, role?: string): Promise<string> => {
    this.accessToken = accessToken
    this.role = role
    return this.output
  }
}

export class ChangeAccountEmailSpy implements ChangeAccountEmail {
  public currentEmail: string
  public newEmail: string

  public async changeEmail(currentEmail: string, newEmail: string): Promise<void> {
    this.currentEmail = currentEmail
    this.newEmail = newEmail
  }
}

export class ChangeAccountPasswordSpy implements ChangeAccountPassword {
  public accountEmail: string
  public currentPassword: string
  public newPassword: string

  public async changePassword(accountEmail: string, currentPassword: string, newPassword: string): Promise<void> {
    this.accountEmail = accountEmail
    this.currentPassword = currentPassword
    this.newPassword = newPassword
  }
}
