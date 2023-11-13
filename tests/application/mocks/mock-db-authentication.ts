import { faker } from '@faker-js/faker'
import { type CheckAccountByEmailRepository, type GetAccountByEmailRepository, type GetAccountByTokenRepository } from '@/application/protocols/db/static/auth'
import { type UpdateAccessTokenRepository, type AddAccountRepository } from '@/application/protocols/db/dynamic/auth'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public email: string
  public output: boolean = false

  public checkByEmail = async(email: string): Promise<boolean> => {
    this.email = email
    return this.output
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  public input: AddAccountRepository.Input

  public add = async(input: AddAccountRepository.Input): Promise<void> => {
    this.input = input
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  public input: UpdateAccessTokenRepository.Input

  public updateAccessToken = async(input: UpdateAccessTokenRepository.Input): Promise<void> => {
    this.input = input
  }
}

export class GetAccountByEmailRepositorySpy implements GetAccountByEmailRepository {
  public email: string
  public output: GetAccountByEmailRepository.Output | null = {
    id: faker.string.uuid(),
    username: faker.person.firstName(),
    password: faker.internet.password()
  }

  public getByEmail = async(email: string): Promise<GetAccountByEmailRepository.Output | null> => {
    this.email = email
    return this.output
  }
}

export class GetAccountByTokenRepositorySpy implements GetAccountByTokenRepository {
  public token: string
  public role: string | undefined
  public account = {
    id: faker.string.uuid()
  }

  public getByToken = async(token: string, role?: string): Promise<GetAccountByTokenRepository.Output> => {
    this.token = token
    this.role = role
    return this.account
  }
}
