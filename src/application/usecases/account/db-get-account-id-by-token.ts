import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountIdByToken } from '@/domain/usecases/account'

export class DbGetAccountIdByToken implements GetAccountIdByToken {
  constructor(private readonly decrypter: Decrypter) {}

  public async getByToken(accessToken: string, role: string): Promise<string> {
    await this.decrypter.decrypt(accessToken)
    return await Promise.resolve('')
  }
}
