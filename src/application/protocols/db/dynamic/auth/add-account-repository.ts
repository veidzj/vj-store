import { type AddAccount } from '@/domain/usecases/auth'

export interface AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<boolean>
}

export namespace AddAccountRepository {
  export type Input = AddAccount.Input
}
