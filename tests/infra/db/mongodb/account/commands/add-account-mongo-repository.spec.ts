import { Collection } from 'mongodb'

import { mockAccount } from '@/tests/domain/mocks/account'
import { MongoHelper } from '@/infra/db/mongodb'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/account/commands'
import { env } from '@/main/config'

let accountCollection: Collection

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

describe('AddAccountMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(mockAccount())
    await expect(promise).rejects.toThrow()
  })

  test('Should add an Account on success', async() => {
    const sut = makeSut()
    const accountInput = mockAccount()
    await sut.add(accountInput)
    const count = await accountCollection.countDocuments()
    const account = await accountCollection.findOne({ email: accountInput.getEmail() })
    expect(count).toBe(1)
    expect(account?.id).toBe(accountInput.getId())
    expect(account?.username).toBe(accountInput.getUsername())
    expect(account?.email).toBe(accountInput.getEmail())
    expect(account?.password).toBe(accountInput.getPassword())
    expect(account?.role).toBe(accountInput.getRole())
    expect(account?.createdAt).toEqual(accountInput.getCreatedAt())
    expect(account?.updateHistory).toBe(accountInput.getUpdateHistory())
  })
})
