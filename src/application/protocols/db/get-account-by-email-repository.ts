export interface GetAccountByEmailRepository {
  getByEmail: (email: string) => Promise<GetAccountByEmailRepository.Output | null>
}

export namespace GetAccountByEmailRepository {
  export interface Output {
    id: string
    username: string
    password: string
  }
}
