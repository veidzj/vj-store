import { faker } from '@faker-js/faker'
import { Collection } from 'mongodb'
import { mockAddAccountInput, throwError } from '@/tests/domain/mocks'
import { StaticAccountMongoRepository } from '@/infra/db/mongodb/static/authentication'
import { MongoHelper } from '@/infra/db/mongodb'

let accountCollection: Collection

const makeSut = (): StaticAccountMongoRepository => {
  return new StaticAccountMongoRepository()
}

describe('StaticAccountMongoRepository', () => {
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
      expect(account?.username).toBe(addAccountInput.username)
      expect(account?.password).toBe(addAccountInput.password)
    })

    test('Should return null if email does not exists', async() => {
      const sut = makeSut()
      const account = await sut.getByEmail(faker.internet.email())
      expect(account).toBeNull()
    })
  })

  describe('getByToken', () => {
    let name = faker.person.firstName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.string.uuid()

    beforeEach(() => {
      name = faker.person.firstName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.string.uuid()
    })

    test('Should return an account id without role on success', async() => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const accountId = await sut.getByToken(accessToken)
      expect(accountId).toBeTruthy()
    })

    test('Should return an account id with admin role on success', async() => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const accountId = await sut.getByToken(accessToken, 'admin')
      expect(accountId).toBeTruthy()
    })

    test('Should return null if invalid role is provided', async() => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const accountId = await sut.getByToken(accessToken, 'admin')
      expect(accountId).toBeNull()
    })

    test('Should return an account id if user is admin and no role is provided', async() => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const accountId = await sut.getByToken(accessToken)
      expect(accountId).toBeTruthy()
    })

    test('Should return null on failure', async() => {
      const sut = makeSut()
      const accountId = await sut.getByToken(accessToken)
      expect(accountId).toBeNull()
    })
  })
})
