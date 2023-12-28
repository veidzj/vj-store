import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { mockAccount } from '@/tests/domain/mocks/account'
import { MongoHelper } from '@/infra/db/mongodb'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'
import { env } from '@/main/config'

let accountCollection: Collection

const makeSut = (): CheckAccountByEmailMongoRepository => {
  return new CheckAccountByEmailMongoRepository()
}

describe('CheckAccountByEmailMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'countDocuments').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.checkByEmail(faker.internet.email())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if email exists', async() => {
    const sut = makeSut()
    const accountInput = mockAccount()
    await accountCollection.insertOne(accountInput)
    const accountExists = await sut.checkByEmail(accountInput.getEmail())
    expect(accountExists).toBe(true)
  })

  test('Should return false if email does not exists', async() => {
    const sut = makeSut()
    const accountExists = await sut.checkByEmail(mockAccount().getEmail())
    expect(accountExists).toBe(false)
  })
})
