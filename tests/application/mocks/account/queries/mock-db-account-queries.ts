import { type CheckAccountByEmailRepository, type GetAccountByEmailRepository, type GetAccountIdByTokenRepository } from '@/application/protocols/account/queries'
import { mockGetAccountByEmailRepositoryOutput } from './mock-db-account-queries-output'
import { faker } from '@faker-js/faker'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public email: string

  public async checkByEmail(email: string): Promise<boolean> {
    this.email = email
    return false
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

export class GetAccountIdByTokenRepositorySpy implements GetAccountIdByTokenRepository {
  public accessToken: string
  public role: string
  public accountId: string | null = faker.string.uuid()

  public async getByToken(accessToken: string, role: string): Promise<string | null> {
    this.accessToken = accessToken
    this.role = role
    return this.accountId
  }
}
