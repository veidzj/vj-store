export interface Authentication {
  auth: (input: Authentication.Input) => Promise<string>
}

export namespace Authentication {
  export interface Input {
    email: string
    password: string
  }
}
