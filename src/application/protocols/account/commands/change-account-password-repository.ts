export interface ChangeAccountPasswordRepository {
  changePassword: (accountEmail: string, newPassword: string) => Promise<void>
}
