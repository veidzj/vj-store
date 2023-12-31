import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getAccountCollection } from '@/tests/infra/db/mongodb/account'
import { mockAddAccountRepositoryInput, mockUpdateAccessTokenInput } from '@/tests/application/mocks/account/commands'
import { UpdateAccessTokenMongoRepository } from '@/infra/db/mongodb/account/commands'

let accountCollection: Collection

const makeSut = (): UpdateAccessTokenMongoRepository => {
  return new UpdateAccessTokenMongoRepository()
}

describe('UpdateAccessTokenMongoRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    accountCollection = await getAccountCollection()
    await clearCollection(accountCollection)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(throwError)
    const promise = sut.updateAccessToken(mockUpdateAccessTokenInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should update accessToken on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne(mockAddAccountRepositoryInput())
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    expect(fakeAccount?.accessToken).toBeFalsy()
    const accessToken = faker.string.uuid()
    await sut.updateAccessToken({ id: fakeAccount?.id, accessToken })
    const account = await accountCollection.findOne({ id: fakeAccount?.id })
    expect(account).toBeTruthy()
    expect(account?.accessToken).toBe(accessToken)
  })
})
