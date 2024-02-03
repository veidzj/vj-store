export interface ChangeEmailRepository {
  change: (currentEmail: string, newEmail: string) => Promise<void>
}
