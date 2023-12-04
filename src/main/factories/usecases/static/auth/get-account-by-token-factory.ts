import { env } from '@/main/config'
import { type GetAccountByToken } from '@/domain/usecases/static/auth'
import { DbGetAccountByToken } from '@/application/usecases/static/auth'
import { JwtAdapter } from '@/infra/cryptography'
import { StaticAccountMongoRepository } from '@/infra/db/mongodb/static/auth'

export class GetAccountByTokenFactory {
  public static makeGetAccountByToken = (): GetAccountByToken => {
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const staticAccountMongoRepository = new StaticAccountMongoRepository()
    return new DbGetAccountByToken(jwtAdapter, staticAccountMongoRepository)
  }
}
