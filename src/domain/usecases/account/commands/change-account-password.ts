export interface ChangeAccountPassword {
  changePassword: (accountEmail: string, currentPassword: string, newPassword: string) => Promise<void>
}
