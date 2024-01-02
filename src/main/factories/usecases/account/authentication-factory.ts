import { env } from '@/main/config'
import { type Authentication } from '@/domain/usecases/account'
import { DbAuthentication } from '@/application/usecases/account'
import { GetAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { UpdateAccessTokenMongoRepository } from '@/infra/db/mongodb/account/commands'

export class AuthenticationFactory {
  public static makeAuthentication = (): Authentication => {
    const salt = 12
    const getAccountByEmailRepository = new GetAccountByEmailMongoRepository()
    const hashComparer = new BcryptAdapter(salt)
    const encrypter = new JwtAdapter(env.jwtSecret)
    const updateAccessTokenRepository = new UpdateAccessTokenMongoRepository()
    return new DbAuthentication(getAccountByEmailRepository, hashComparer, encrypter, updateAccessTokenRepository)
  }
}
