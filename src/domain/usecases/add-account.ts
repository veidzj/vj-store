export interface AddAccount {
  add: (input: AddAccount.Input) => Promise<AddAccount.Output>
}

export namespace AddAccount {
  export interface Input {
    name: string
    email: string
    password: string
  }

  export type Output = boolean
}