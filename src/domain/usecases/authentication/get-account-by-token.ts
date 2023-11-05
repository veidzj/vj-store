export interface GetAccountByToken {
  getByToken: (accessToken: string, role?: string) => Promise<string | null>
}
