import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountByTokenRepository } from '@/application/protocols/db/static/authentication'
import { type GetAccountByToken } from '@/domain/usecases/authentication'

export class DbGetAccountByToken implements GetAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly getAccountByTokenRepository: GetAccountByTokenRepository
  ) {}

  public getByToken = async(accessToken: string, role?: string): Promise<string | null> => {
    const token = await this.decrypter.decrypt(accessToken)
    if (!token) return null
    const accountId = await this.getAccountByTokenRepository.getByToken(accessToken, role)
    if (!accountId) return null
    return ''
  }
}
