import { type UpdateLog } from '@/domain/common'
import { type AccountFields } from '@/domain/entities/account'

export interface AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<void>
}

export namespace AddAccountRepository {
  export interface Input {
    id: string
    username: string
    email: string
    password: string
    role: string
    isActive: boolean
    createdAt: Date
    updateHistory: UpdateLog<AccountFields> | []
  }
}
