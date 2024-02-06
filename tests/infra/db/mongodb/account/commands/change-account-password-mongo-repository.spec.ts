import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { ChangeAccountPasswordMongoRepository } from '@/infra/db/mongodb/account/commands'

let accountCollection: Collection

const makeSut = (): ChangeAccountPasswordMongoRepository => {
  return new ChangeAccountPasswordMongoRepository()
}

describe('ChangeAccountPasswordMongoRepository', () => {
  let accountEmail: string
  let newPassword: string

  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    accountEmail = faker.internet.email()
    newPassword = faker.internet.password()
    accountCollection = await getCollection('accounts')
    await clearCollection(accountCollection)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(throwError)
    const promise = sut.changePassword(accountEmail, newPassword)
    await expect(promise).rejects.toThrow()
  })
})
