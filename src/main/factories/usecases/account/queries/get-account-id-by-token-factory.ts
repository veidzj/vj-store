import { env } from '@/main/config'
import { type GetAccountIdByToken } from '@/domain/usecases/account/queries'
import { DbGetAccountIdByToken } from '@/application/usecases/account/queries'
import { GetAccountIdByTokenMongoRepository } from '@/infra/db/mongodb/account/queries'
import { JwtAdapter } from '@/infra/cryptography'

export class GetAccountIdByTokenFactory {
  public static readonly makeGetAccountIdByToken = (): GetAccountIdByToken => {
    const decrypter = new JwtAdapter(env.jwtSecret)
    const getAccountIdByTokenRepositroy = new GetAccountIdByTokenMongoRepository()
    return new DbGetAccountIdByToken(decrypter, getAccountIdByTokenRepositroy)
  }
}
