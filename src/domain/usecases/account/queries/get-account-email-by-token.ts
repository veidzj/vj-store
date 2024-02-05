export interface GetAccountEmailByToken {
  getByToken: (accessToken: string, role: string) => Promise<string>
}
