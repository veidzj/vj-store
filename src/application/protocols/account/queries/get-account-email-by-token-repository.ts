export interface GetAccountEmailByTokenRepository {
  getByToken: (accessToken: string, role: string) => Promise<string | null>
}
