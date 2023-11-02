import { env } from '@/main/config/env'
import { type Authentication } from '@/domain/usecases/authentication'
import { DbAuthentication } from '@/application/usecases/authentication'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { StaticAccountMongoRepository } from '@/infra/db/mongodb/static/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const staticAccountMongoRepository = new StaticAccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(staticAccountMongoRepository, bcryptAdapter, jwtAdapter)
}
