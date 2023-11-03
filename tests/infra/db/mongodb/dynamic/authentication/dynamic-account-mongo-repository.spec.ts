import { Collection } from 'mongodb'
import { mockAddAccountInput, throwError } from '@/tests/domain/mocks'
import { DynamicAccountMongoRepository } from '@/infra/db/mongodb/dynamic/authentication'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type UpdateAccessTokenRepository } from '@/application/protocols/db/dynamic/authentication'
import { faker } from '@faker-js/faker'

let accountCollection: Collection

const makeSut = (): DynamicAccountMongoRepository => {
  return new DynamicAccountMongoRepository()
}

const mockUpdateAccessTokenInput = (): UpdateAccessTokenRepository.Input => ({
  id: faker.string.uuid(),
  token: faker.string.alphanumeric(12)
})

describe('DynamicAccountMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    accountCollection = MongoHelper.getCollection('accounts')
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

  describe('updateAccessToken', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      const originalUpdateOne = Collection.prototype.updateOne
      jest.spyOn(Collection.prototype, 'updateOne').mockImplementation(throwError)
      const promise = sut.updateAccessToken(mockUpdateAccessTokenInput())
      await expect(promise).rejects.toThrow()
      Collection.prototype.updateOne = originalUpdateOne
    })

    test('Should update the account accessToken on success', async() => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(mockAddAccountInput())
      const fakeAccount = await accountCollection.findOne({ _id: res.insertedId })
      expect(fakeAccount?.accessToken).toBeFalsy()
      const accessToken = faker.string.uuid()
      await sut.updateAccessToken({ id: fakeAccount?._id.toString() as string, token: accessToken })
      const account = await accountCollection.findOne({ _id: fakeAccount?._id })
      expect(account).toBeTruthy()
      expect(account?.accessToken).toBe(accessToken)
    })
  })
})
