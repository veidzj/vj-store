import { type Account } from '@/domain/entities/account'

export interface AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<void>
}

export namespace AddAccountRepository {
  export type Input = Account
}
