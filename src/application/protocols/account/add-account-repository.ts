import { type Account } from '@/domain/entities/account'

export interface AddAccountRepository {
  add: (input: Account) => Promise<void>
}
