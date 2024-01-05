export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super('Account already exists')
  }
}
