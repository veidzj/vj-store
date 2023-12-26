export interface AddAccount {
  add: (input: AddAccount.Input) => Promise<void>
}

export namespace AddAccount {
  export interface Input {
    Username: string
    Email: string
    Password: string
  }
}
