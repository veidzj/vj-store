import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'
import { mockAddAccountInput, throwError } from '@/tests/domain/mocks'
import { DynamicAccountMongoRepository } from '@/infra/db/mongodb/dynamic/auth'
import { MongoHelper } from '@/infra/db/mongodb'
import { type UpdateAccessTokenRepository } from '@/application/protocols/db/dynamic/auth'

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

    test('Should add an account on success', async() => {
      const sut = makeSut()
      await sut.add(mockAddAccountInput())
      const count = await accountCollection.countDocuments()
      expect(count).toBe(1)
    })

    test('Should add an account with user role on success', async() => {
      const sut = makeSut()
      const accountInput = mockAddAccountInput()
      await sut.add(accountInput)
      const account = await accountCollection.findOne({ email: accountInput.email })
      expect(account?.role).toBe('user')
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

    test('Should update the account access token on success', async() => {
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
