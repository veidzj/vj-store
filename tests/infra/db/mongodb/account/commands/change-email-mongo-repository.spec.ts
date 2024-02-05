import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/account/commands'
import { ChangeEmailMongoRepository } from '@/infra/db/mongodb/account/commands'

let accountCollection: Collection

const makeSut = (): ChangeEmailMongoRepository => {
  return new ChangeEmailMongoRepository()
}

describe('ChangeEmailMongoRepository', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  test('Should change an email on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne(mockAddAccountRepositoryInput())
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    await sut.change(fakeAccount?.email as string, newEmail)
    const account = await accountCollection.findOne({ email: newEmail })
    expect(account).toBeTruthy()
    expect(account?.email).toBe(newEmail)
  })
})
