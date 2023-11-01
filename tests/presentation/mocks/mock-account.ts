import { faker } from '@faker-js/faker'
import { type AddAccount } from '@/domain/usecases/add-account'
import { type Authentication } from '@/domain/usecases/authentication'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input
  public output: boolean = true

  add = async(input: AddAccount.Input): Promise<boolean> => {
    this.input = input
    return this.output
  }
}

export class AuthenticationSpy implements Authentication {
  public input: Authentication.Input
  public output: Authentication.Output | null = {
    username: faker.person.firstName(),
    accessToken: faker.string.uuid()
  }

  auth = async(input: Authentication.Input): Promise<Authentication.Output | null> => {
    this.input = input
    return this.output
  }
}
