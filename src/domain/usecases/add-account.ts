export interface AddAccount {
  add: (input: AddAccount.Input) => Promise<boolean>
}

export namespace AddAccount {
  export interface Input {
    name: string
    email: string
    password: string
  }
}
