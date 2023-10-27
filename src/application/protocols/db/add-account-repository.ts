import { type AddAccount } from '../../../domain/usecases/add-account'

export interface AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<boolean>
}

export namespace AddAccountRepository {
  export type Input = AddAccount.Input
}
