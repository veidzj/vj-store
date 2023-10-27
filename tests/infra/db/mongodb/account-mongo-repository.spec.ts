import { faker } from '@faker-js/faker'
import { Collection } from 'mongodb'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { mockAddAccountInput } from '@/tests/domain/mocks/mock-account'
import { throwError } from '@/tests/domain/mocks/test-helper'

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

  describe('checkByEmail', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(throwError)
      const promise = sut.checkByEmail(mockAddAccountInput().email)
      await expect(promise).rejects.toThrow()
    })

    test('Should return true if email exists', async() => {
      const sut = makeSut()
      const addAccountInput = mockAddAccountInput()
      await accountCollection.insertOne(addAccountInput)
      const exists = await sut.checkByEmail(addAccountInput.email)
      expect(exists).toBe(true)
    })

    test('Should return false if email does not exists', async() => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(mockAddAccountInput().email)
      expect(exists).toBe(false)
    })
  })

  describe('getByEmail', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(throwError)
      const promise = sut.getByEmail(mockAddAccountInput().email)
      await expect(promise).rejects.toThrow()
    })

    test('Should return an account if email exists', async() => {
      const sut = makeSut()
      const addAccountInput = mockAddAccountInput()
      await accountCollection.insertOne(addAccountInput)
      const account = await sut.getByEmail(addAccountInput.email)
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe(addAccountInput.name)
      expect(account?.password).toBe(addAccountInput.password)
    })

    test('Should return null if email does not exists', async() => {
      const sut = makeSut()
      const account = await sut.getByEmail(faker.internet.email())
      expect(account).toBeNull()
    })
  })
})
