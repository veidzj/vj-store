import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountByTokenRepository } from '@/application/protocols/db/static/auth'
import { type GetAccountByToken } from '@/domain/usecases/auth'

export class DbGetAccountByToken implements GetAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly getAccountByTokenRepository: GetAccountByTokenRepository
  ) {}

  public getByToken = async(accessToken: string, role?: string): Promise<GetAccountByToken.Output> => {
    await this.decrypter.decrypt(accessToken)
    return await this.getAccountByTokenRepository.getByToken(accessToken, role)
  }
}
