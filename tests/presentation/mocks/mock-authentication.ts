import { faker } from '@faker-js/faker'
import { type AddAccount, type Authentication, type GetAccountByToken } from '@/domain/usecases/authentication'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input
  public output: boolean = true

  public add = async(input: AddAccount.Input): Promise<boolean> => {
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

  public auth = async(input: Authentication.Input): Promise<Authentication.Output | null> => {
    this.input = input
    return this.output
  }
}

export class GetAccountByTokenSpy implements GetAccountByToken {
  public accessToken: string
  public role?: string
  public id: string | null = faker.string.uuid()

  public getByToken = async(accessToken: string, role?: string): Promise<string | null> => {
    this.accessToken = accessToken
    this.role = role
    return this.id
  }
}
