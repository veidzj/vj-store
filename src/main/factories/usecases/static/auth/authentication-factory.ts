import { env } from '@/main/config/env'
import { type Authentication } from '@/domain/usecases/static/auth'
import { DbAuthentication } from '@/application/usecases/static/auth'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { StaticAccountMongoRepository } from '@/infra/db/mongodb/static/auth'
import { DynamicAccountMongoRepository } from '@/infra/db/mongodb/dynamic/auth'

export class AuthenticationFactory {
  public static makeAuthentication = (): Authentication => {
    const salt = 12
    const staticAccountMongoRepository = new StaticAccountMongoRepository()
    const dynamicAccountMongoRepository = new DynamicAccountMongoRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    return new DbAuthentication(staticAccountMongoRepository, bcryptAdapter, jwtAdapter, dynamicAccountMongoRepository)
  }
}
