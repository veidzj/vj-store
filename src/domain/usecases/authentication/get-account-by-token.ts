export interface GetAccountByToken {
  getByToken: (accessToken: string, role?: string) => Promise<GetAccountByToken.Output>
}

export namespace GetAccountByToken {
  export interface Output {
    id: string
  }
}
