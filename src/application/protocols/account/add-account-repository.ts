export interface AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<void>
}

export namespace AddAccountRepository {
  export interface Input {
    Username: string
    Email: string
    Password: string
  }
}
