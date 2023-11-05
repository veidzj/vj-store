import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountByToken } from '@/domain/usecases/authentication'

export class DbGetAccountByToken implements GetAccountByToken {
  constructor(
    private readonly decrypter: Decrypter
  ) {}

  public getByToken = async(accessToken: string, role?: string): Promise<string | null> => {
    const token = await this.decrypter.decrypt(accessToken)
    if (!token) return null
    return ''
  }
}
