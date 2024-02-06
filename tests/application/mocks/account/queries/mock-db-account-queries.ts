import { faker } from '@faker-js/faker'

import { mockGetAccountByEmailRepositoryOutput } from '@/tests/application/mocks/account/queries'
import { type CheckAccountByEmailRepository, type GetAccountByEmailRepository, type GetAccountEmailByTokenRepository } from '@/application/protocols/account/queries'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public email: string
  public output: boolean = false

  public async checkByEmail(email: string): Promise<boolean> {
    this.email = email
    return this.output
  }
}

export class GetAccountByEmailRepositorySpy implements GetAccountByEmailRepository {
  public email: string
  public output: GetAccountByEmailRepository.Output | null = mockGetAccountByEmailRepositoryOutput()

  public async getByEmail(email: string): Promise<GetAccountByEmailRepository.Output | null> {
    this.email = email
    return this.output
  }
}

export class GetAccountEmailByTokenRepositorySpy implements GetAccountEmailByTokenRepository {
  public accessToken: string
  public role: string
  public output: string | null = faker.string.uuid()

  public async getByToken(accessToken: string, role: string): Promise<string | null> {
    this.accessToken = accessToken
    this.role = role
    return this.output
  }
}
