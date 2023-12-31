export class AccountNotFoundError extends Error {
  constructor() {
    super('Account not found')
  }
}
