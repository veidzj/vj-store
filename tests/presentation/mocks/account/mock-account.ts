import { type AddAccount, type Authentication, type GetAccountIdByToken } from '@/domain/usecases/account'
import { faker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input

  public async add(input: AddAccount.Input): Promise<void> {
    this.input = input
  }
}

export class AuthenticationSpy implements Authentication {
  public input: Authentication.Input
  public accessToken: string = faker.string.uuid()

  public async auth(input: Authentication.Input): Promise<string> {
    this.input = input
    return await Promise.resolve(this.accessToken)
  }
}

export class GetAccountIdByTokenSpy implements GetAccountIdByToken {
  public accessToken: string
  public role?: string
  public accountId = faker.string.uuid()

  public getByToken = async(accessToken: string, role?: string): Promise<string> => {
    this.accessToken = accessToken
    this.role = role
    return this.accountId
  }
}
