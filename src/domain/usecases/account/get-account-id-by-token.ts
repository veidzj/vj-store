export interface GetAccountIdByToken {
  getByToken: (accessToken: string, role: string) => Promise<string>
}
