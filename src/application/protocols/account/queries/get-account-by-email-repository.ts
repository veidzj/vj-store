import { type Account } from '@/domain/entities/account'

export interface GetAccountByEmailRepository {
  getByEmail: (email: string) => Promise<Account>
}
