export interface ChangeEmail {
  change: (currentEmail: string, newEmail: string) => Promise<void>
}
