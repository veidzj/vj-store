import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/account/commands'
import { GetAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'

let accountCollection: Collection

const makeSut = (): GetAccountByEmailMongoRepository => {
  return new GetAccountByEmailMongoRepository()
}

describe('GetAccountByEmailMongoRepository', () => {
  const sut = makeSut()

  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    accountCollection = await getCollection('accounts')
    await clearCollection(accountCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(throwError)
    const promise = sut.getByEmail(faker.internet.email())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if email is not registered', async() => {
    const account = await sut.getByEmail(faker.internet.email())
    expect(account).toBeNull()
  })

  test('Should return an account on success', async() => {
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    await accountCollection.insertOne(addAccountRepositoryInput)
    const account = await sut.getByEmail(addAccountRepositoryInput.email)
    expect(account?.id).toBe(addAccountRepositoryInput.id)
    expect(account?.password).toBe(addAccountRepositoryInput.password)
  })
})
