export interface ChangeAccountPasswordRepository {
  changePassword: (accountEmail: string, currentPassword: string, newPassword: string) => Promise<void>
}
