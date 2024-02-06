import { env } from '@/main/config'
import { type GetAccountEmailByToken } from '@/domain/usecases/account/queries'
import { DbGetAccountEmailByToken } from '@/application/usecases/account/queries'
import { GetAccountEmailByTokenMongoRepository } from '@/infra/db/mongodb/account/queries'
import { JwtAdapter } from '@/infra/cryptography'

export class GetAccountEmailByTokenFactory {
  public static readonly makeGetAccountEmailByToken = (): GetAccountEmailByToken => {
    const decrypter = new JwtAdapter(env.jwtSecret)
    const getAccountEmailByTokenRepositroy = new GetAccountEmailByTokenMongoRepository()
    return new DbGetAccountEmailByToken(decrypter, getAccountEmailByTokenRepositroy)
  }
}
