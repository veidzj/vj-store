import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { MongoHelper } from '@/infra/db/mongodb'
import { GetAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'
import { env } from '@/main/config'

let accountCollection: Collection

const makeSut = (): GetAccountByEmailMongoRepository => {
  return new GetAccountByEmailMongoRepository()
}

describe('GetAccountByEmailMongoRepository', () => {
  const mongoHelper: MongoHelper = MongoHelper.getInstance()

  beforeAll(async() => {
    await mongoHelper.connect(env.mongoUrl)
  })

  afterAll(async() => {
    await mongoHelper.disconnect()
  })

  beforeEach(async() => {
    accountCollection = mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.getByEmail(faker.internet.email())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if email is not registered', async() => {
    const sut = makeSut()
    const account = await sut.getByEmail(faker.internet.email())
    expect(account).toBeNull()
  })
})
