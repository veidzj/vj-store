export interface Authentication {
  auth: (input: Authentication.Input) => Promise<Authentication.Output | null>
}

export namespace Authentication {
  export interface Input {
    email: string
    password: string
  }

  export interface Output {
    name: string
    accessToken: string
  }
}
