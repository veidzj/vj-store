import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearDatabase } from '@/tests/infra/db/mongodb'
import { getAccountCollection } from '@/tests/infra/db/mongodb/account'
import { mockAccount } from '@/tests/domain/mocks/account'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'

let accountCollection: Collection

const makeSut = (): CheckAccountByEmailMongoRepository => {
  return new CheckAccountByEmailMongoRepository()
}

describe('CheckAccountByEmailMongoRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    accountCollection = await getAccountCollection()
    await clearDatabase(accountCollection)
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
