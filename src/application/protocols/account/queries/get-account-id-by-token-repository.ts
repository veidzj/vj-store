export interface GetAccountIdByTokenRepository {
  getByToken: (accessToken: string, role: string) => Promise<string | null>
}
