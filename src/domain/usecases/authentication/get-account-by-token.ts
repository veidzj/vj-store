export interface GetAccountByToken {
  get: (accessToken: string, role?: string) => Promise<string | null>
}
