export interface GetAccountByTokenRepository {
  getByToken: (token: string, role: string) => Promise<GetAccountByTokenRepository.Output | null>
}

export namespace GetAccountByTokenRepository {
  export interface Output {
    id: string
  }
}
