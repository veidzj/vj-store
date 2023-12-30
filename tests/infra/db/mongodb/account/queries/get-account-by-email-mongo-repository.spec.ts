import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getAccountCollection } from '@/tests/infra/db/mongodb/account'
import { mockAccount } from '@/tests/domain/mocks/account'
import { GetAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'

let accountCollection: Collection

const makeSut = (): GetAccountByEmailMongoRepository => {
  return new GetAccountByEmailMongoRepository()
}

describe('GetAccountByEmailMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.getByEmail(faker.internet.email())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if email is not registered', async() => {
    const sut = makeSut()
    const account = await sut.getByEmail(faker.internet.email())
    expect(account).toBeNull()
  })

  test('Should return an account on success', async() => {
    const sut = makeSut()
    const accountInput = mockAccount()
    await accountCollection.insertOne(accountInput)
    const account = await sut.getByEmail(accountInput.getEmail())
    expect(account?.id).toBe(accountInput.getId())
    expect(account?.password).toBe(accountInput.getPassword())
  })
})
