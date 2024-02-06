export interface ChangeAccountEmail {
  changeEmail: (currentEmail: string, newEmail: string) => Promise<void>
}
