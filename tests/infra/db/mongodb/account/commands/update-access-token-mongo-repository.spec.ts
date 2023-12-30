import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearDatabase } from '@/tests/infra/db/mongodb'
import { getAccountCollection } from '@/tests/infra/db/mongodb/account'
import { mockAccount } from '@/tests/domain/mocks/account'
import { UpdateAccessTokenMongoRepository } from '@/infra/db/mongodb/account/commands'
import { type UpdateAccessTokenRepository } from '@/application/protocols/account/commands'

let accountCollection: Collection

const makeSut = (): UpdateAccessTokenMongoRepository => {
  return new UpdateAccessTokenMongoRepository()
}

const mockUpdateAccessTokenInput = (): UpdateAccessTokenRepository.Input => ({
  id: faker.string.uuid(),
  accessToken: faker.string.uuid()
})

describe('UpdateAccessTokenMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.updateAccessToken(mockUpdateAccessTokenInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should update accessToken on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne(mockAccount())
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    expect(fakeAccount?.accessToken).toBeFalsy()
    const accessToken = faker.string.uuid()
    await sut.updateAccessToken({ id: fakeAccount?.id, accessToken })
    const account = await accountCollection.findOne({ id: fakeAccount?.id })
    expect(account).toBeTruthy()
    expect(account?.accessToken).toBe(accessToken)
  })
})
