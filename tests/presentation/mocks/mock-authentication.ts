import { faker } from '@faker-js/faker'

import { type AddAccount, type Authentication, type GetAccountByToken } from '@/domain/usecases/auth'
import { type Account } from '@/domain/models'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input

  public add = async(input: AddAccount.Input): Promise<void> => {
    this.input = input
  }
}

export class AuthenticationSpy implements Authentication {
  public input: Authentication.Input
  public account: Account = {
    username: faker.person.firstName(),
    accessToken: faker.string.uuid()
  }

  public auth = async(input: Authentication.Input): Promise<Account> => {
    this.input = input
    return this.account
  }
}

export class GetAccountByTokenSpy implements GetAccountByToken {
  public accessToken: string
  public role?: string
  public account = {
    id: faker.string.uuid()
  }

  public getByToken = async(accessToken: string, role?: string): Promise<GetAccountByToken.Output> => {
    this.accessToken = accessToken
    this.role = role
    return this.account
  }
}
