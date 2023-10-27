import { type Collection } from 'mongodb'
import { AccountMongoRepository } from '../../../../src/infra/db/mongodb/account-mongo-repository'
import { MongoHelper } from '../../../../src/infra/db/mongodb/mongo-helper'
import { mockAddAccountInput } from '../../../domain/mocks/mock-account'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
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
    test('Should return true on success', async() => {
      const sut = makeSut()
      const addAccountInput = mockAddAccountInput()
      const isValid = await sut.add(addAccountInput)
      expect(isValid).toBe(true)
    })
  })
})
