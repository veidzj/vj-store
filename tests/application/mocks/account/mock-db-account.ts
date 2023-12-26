import { type CheckAccountByEmailRepository, type AddAccountRepository } from '@/application/protocols/account'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public email: string

  public async checkByEmail(email: string): Promise<boolean> {
    this.email = email
    return false
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  public input: AddAccountRepository.Input

  public async add(input: AddAccountRepository.Input): Promise<void> {
    this.input = input
  }
}
