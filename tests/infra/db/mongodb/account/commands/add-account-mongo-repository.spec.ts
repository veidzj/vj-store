import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearDatabase } from '@/tests/infra/db/mongodb'
import { getAccountCollection } from '@/tests/infra/db/mongodb/account'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/account/commands'
import { type AddAccountRepository } from '@/application/protocols/account/commands'

let accountCollection: Collection

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

const mockAddAccountRepositoryInput = (): AddAccountRepository.Input => ({
  id: faker.string.uuid(),
  username: faker.string.alpha({ length: { min: 3, max: 12 }, casing: 'lower' }),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: faker.word.words(),
  isActive: faker.datatype.boolean(),
  createdAt: faker.date.anytime(),
  updateHistory: []
})

describe('AddAccountMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(mockAddAccountRepositoryInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should add an Account on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    await sut.add(addAccountRepositoryInput)
    const count = await accountCollection.countDocuments()
    const account = await accountCollection.findOne({ email: addAccountRepositoryInput.email })
    expect(count).toBe(1)
    expect(account?.id).toBe(addAccountRepositoryInput.id)
    expect(account?.username).toBe(addAccountRepositoryInput.username)
    expect(account?.email).toBe(addAccountRepositoryInput.email)
    expect(account?.password).toBe(addAccountRepositoryInput.password)
    expect(account?.role).toBe(addAccountRepositoryInput.role)
    expect(account?.createdAt).toEqual(addAccountRepositoryInput.createdAt)
    expect(account?.updateHistory).toEqual(addAccountRepositoryInput.updateHistory)
  })
})
