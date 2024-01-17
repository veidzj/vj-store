export class AccountHelper {
  public static formatUsername(username: string): string {
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
  }
}
