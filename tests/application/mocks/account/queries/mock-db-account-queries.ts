import { type CheckAccountByEmailRepository, type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { mockGetAccountByEmailRepositoryOutput } from './mock-db-account-queries-output'

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
