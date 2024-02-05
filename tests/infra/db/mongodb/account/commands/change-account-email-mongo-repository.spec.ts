import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/account/commands'
import { ChangeAccountEmailMongoRepository } from '@/infra/db/mongodb/account/commands'

let accountCollection: Collection

const makeSut = (): ChangeAccountEmailMongoRepository => {
  return new ChangeAccountEmailMongoRepository()
}

describe('ChangeAccountEmailMongoRepository', () => {
  let currentEmail: string
  let newEmail: string

  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    currentEmail = faker.internet.email()
    newEmail = faker.internet.email()
    accountCollection = await getCollection('accounts')
    await clearCollection(accountCollection)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(throwError)
    const promise = sut.changeEmail(currentEmail, newEmail)
    await expect(promise).rejects.toThrow()
  })

  test('Should change an email on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne(mockAddAccountRepositoryInput())
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    await sut.changeEmail(fakeAccount?.email as string, newEmail)
    const account = await accountCollection.findOne({ email: newEmail })
    expect(account).toBeTruthy()
    expect(account?.email).toBe(newEmail)
  })
})
