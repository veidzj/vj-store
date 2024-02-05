export interface ChangeAccountPassword {
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
}
