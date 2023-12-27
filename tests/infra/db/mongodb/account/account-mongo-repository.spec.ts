import { Collection } from 'mongodb'

import { mockAccount } from '@/tests/domain/mocks/account'
import { MongoHelper } from '@/infra/db/mongodb'
import { AccountMongoRepository } from '@/infra/db/mongodb/account'
import { env } from '@/main/config'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
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

  describe('AddAccountRepository', () => {
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
      const account = await accountCollection.findOne({ Email: accountInput.getEmail() })

      expect(count).toBe(1)
      expect(account?.Id).toBe(accountInput.getId())
      expect(account?.Username).toBe(accountInput.getUsername())
      expect(account?.Email).toBe(accountInput.getEmail())
      expect(account?.Password).toBe(accountInput.getPassword())
      expect(account?.Role).toBe(accountInput.getRole())
      expect(account?.CreatedAt).toEqual(accountInput.getCreatedAt())
      expect(account?.UpdateHistory).toBe(accountInput.getUpdateHistory())
    })
  })
})
