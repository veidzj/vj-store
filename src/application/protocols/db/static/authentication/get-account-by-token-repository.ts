export interface GetAccountByTokenRepository {
  getByToken: (token: string, role?: string) => Promise<GetAccountByTokenRepository.Output>
}

export namespace GetAccountByTokenRepository {
  export interface Output {
    id: string
  }
}
