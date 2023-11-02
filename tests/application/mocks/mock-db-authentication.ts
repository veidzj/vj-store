import { faker } from '@faker-js/faker'
import { type CheckAccountByEmailRepository, type GetAccountByEmailRepository } from '@/application/protocols/db/static/authentication'
import { type AddAccountRepository } from '@/application/protocols/db/dynamic/authentication'

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
  public output: boolean = true

  public add = async(input: AddAccountRepository.Input): Promise<boolean> => {
    this.input = input
    return this.output
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
