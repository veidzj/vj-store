import { faker } from '@faker-js/faker'
import { type CheckAccountByEmailRepository } from '../../../src/application/protocols/db/check-account-by-email-repository'
import { type AddAccountRepository } from '../../../src/application/protocols/db/add-account-repository'
import { type GetAccountByEmailRepository } from '../../../src/application/protocols/db/get-account-by-email-repository'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public input: CheckAccountByEmailRepository.Input
  public output: CheckAccountByEmailRepository.Output = false

  public checkByEmail = async(input: CheckAccountByEmailRepository.Input): Promise<CheckAccountByEmailRepository.Output> => {
    this.input = input
    return this.output
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  public input: AddAccountRepository.Input
  public output: AddAccountRepository.Output = true

  public add = async(input: AddAccountRepository.Input): Promise<AddAccountRepository.Output> => {
    this.input = input
    return this.output
  }
}

export class GetAccountByEmailRepositorySpy implements GetAccountByEmailRepository {
  public email: string
  public output: GetAccountByEmailRepository.Output | null = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    password: faker.internet.password()
  }

  public getByEmail = async(email: string): Promise<GetAccountByEmailRepository.Output | null> => {
    this.email = email
    return this.output
  }
}
