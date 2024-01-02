import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getAccountCollection } from '@/tests/infra/db/mongodb/account'
import { GetAccountIdByTokenMongoRepository } from '@/infra/db/mongodb/account/queries'

let accountCollection: Collection

const makeSut = (): GetAccountIdByTokenMongoRepository => {
  return new GetAccountIdByTokenMongoRepository()
}

describe('GetAccountIdByTokenMongoRepository', () => {
  const sut = makeSut()
  const userRole: string = 'user'
  let id: string = faker.string.uuid()
  let username: string = faker.string.alpha({ length: { min: 3, max: 12 }, casing: 'lower' })
  let email: string = faker.internet.email()
  let password: string = faker.internet.password()
  let accessToken: string

  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    id = faker.string.uuid()
    username = faker.string.alpha({ length: { min: 3, max: 12 }, casing: 'lower' })
    email = faker.internet.email()
    password = faker.internet.password()
    accessToken = faker.string.uuid()
    accountCollection = await getAccountCollection()
    await clearCollection(accountCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(throwError)
    const promise = sut.getByToken(accessToken, userRole)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an accountId with user role on success', async() => {
    const sut = makeSut()
    await accountCollection.insertOne({
      id,
      username,
      email,
      password,
      accessToken,
      role: userRole
    })
    const accountId = await sut.getByToken(accessToken, userRole)
    expect(accountId).toBe(id)
  })
})
