import { type AddAccount } from '../../../src/domain/usecases/add-account'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input
  public output: AddAccount.Output = true

  add = async(input: AddAccount.Input): Promise<AddAccount.Output> => {
    this.input = input
    return this.output
  }
}
