export interface GetAccountByTokenRepository {
  getByToken: (token: string, role?: string) => Promise<string | null>
}
