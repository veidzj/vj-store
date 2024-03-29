import { faker } from '@faker-js/faker'

import { type AddAccount, type Authentication } from '@/domain/usecases/account/authentication'

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
