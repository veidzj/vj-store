export interface ChangeAccountEmailRepository {
  changeEmail: (currentEmail: string, newEmail: string) => Promise<void>
}
