import { faker } from '@faker-js/faker'

import { type CheckAccountByEmailRepository, type GetAccountByEmailRepository } from '@/application/protocols/account/queries'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public email: string

  public async checkByEmail(email: string): Promise<boolean> {
    this.email = email
    return false
  }
}

export class GetAccountByEmailRepositorySpy implements GetAccountByEmailRepository {
  public email: string
  public output: GetAccountByEmailRepository.Output | null = {
    id: faker.string.uuid(),
    password: faker.internet.password()
  }

  public async getByEmail(email: string): Promise<GetAccountByEmailRepository.Output | null> {
    this.email = email
    return this.output
  }
}
