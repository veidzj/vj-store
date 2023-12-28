import { type Account } from '@/domain/entities/account'

export interface AddAccountRepository {
  add: (account: Account) => Promise<void>
}
