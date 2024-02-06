import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/account/commands'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/account/commands'

let accountCollection: Collection

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

describe('AddAccountMongoRepository', () => {
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
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(throwError)
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
    expect(account?.updatedAt).toEqual(addAccountRepositoryInput.updatedAt)
  })
})
