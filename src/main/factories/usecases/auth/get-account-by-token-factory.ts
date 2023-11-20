import { DbGetAccountByToken } from '@/application/usecases/auth'
import { type GetAccountByToken } from '@/domain/usecases/auth'
import { JwtAdapter } from '@/infra/cryptography'
import { StaticAccountMongoRepository } from '@/infra/db/mongodb/static/auth'
import { env } from '@/main/config'

export const makeDbGetAccountByToken = (): GetAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const staticAccountMongoRepository = new StaticAccountMongoRepository()
  return new DbGetAccountByToken(jwtAdapter, staticAccountMongoRepository)
}
