import { Collection } from 'mongodb'
import { mockAddAccountInput, throwError } from '@/tests/domain/mocks'
import { DynamicAccountMongoRepository } from '@/infra/db/mongodb/dynamic/authentication'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

let accountCollection: Collection

const makeSut = (): DynamicAccountMongoRepository => {
  return new DynamicAccountMongoRepository()
}

describe('DynamicAccountMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    accountCollection = MongoHelper.getCollection('account')
    await accountCollection.deleteMany({})
  })

  describe('add', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should return true on success', async() => {
      const sut = makeSut()
      const addAccountInput = mockAddAccountInput()
      const isValid = await sut.add(addAccountInput)
      expect(isValid).toBe(true)
    })
  })
})
