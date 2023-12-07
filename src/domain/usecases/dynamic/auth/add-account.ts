export interface AddAccount {
  add: (input: AddAccount.Input) => Promise<void>
}

export namespace AddAccount {
  export interface Input {
    username: string
    email: string
    password: string
    addedAt: Date
  }
}
