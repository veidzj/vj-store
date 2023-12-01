import { type Account } from '@/domain/models'

export interface Authentication {
  auth: (input: Authentication.Input) => Promise<Account>
}

export namespace Authentication {
  export interface Input {
    email: string
    password: string
  }
}
