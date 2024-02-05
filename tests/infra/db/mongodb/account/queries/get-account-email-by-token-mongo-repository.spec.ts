import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { GetAccountEmailByTokenMongoRepository } from '@/infra/db/mongodb/account/queries'

let accountCollection: Collection

const makeSut = (): GetAccountEmailByTokenMongoRepository => {
  return new GetAccountEmailByTokenMongoRepository()
}

describe('GetAccountEmailByTokenMongoRepository', () => {
  const sut = makeSut()
  const userRole: string = 'user'
  const adminRole: string = 'admin'
  let id: string
  let username: string
  let email: string
  let password: string
  let accessToken: string

  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    id = faker.string.uuid()
    username = faker.string.alpha({ length: { min: 3, max: 12 } })
    email = faker.internet.email()
    password = faker.internet.password()
    accessToken = faker.string.uuid()
    accountCollection = await getCollection('accounts')
    await clearCollection(accountCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'findOne').mockImplementationOnce(throwError)
    const promise = sut.getByToken(accessToken, userRole)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if invalid role is provided', async() => {
    const sut = makeSut()
    await accountCollection.insertOne({
      username,
      email,
      password,
      accessToken
    })
    const accountEmail = await sut.getByToken(accessToken, faker.word.words())
    expect(accountEmail).toBeNull()
  })

  test('Should return null if role is user and provided role is admin', async() => {
    const sut = makeSut()
    await accountCollection.insertOne({
      username,
      email,
      password,
      accessToken,
      role: userRole
    })
    const accountEmail = await sut.getByToken(accessToken, adminRole)
    expect(accountEmail).toBeNull()
  })

  test('Should return an email with user role on success', async() => {
    const sut = makeSut()
    await accountCollection.insertOne({
      id,
      username,
      email,
      password,
      accessToken,
      role: userRole
    })
    const accountEmail = await sut.getByToken(accessToken, userRole)
    expect(accountEmail).toBe(email)
  })

  test('Should return an email with admin role on success', async() => {
    const sut = makeSut()
    await accountCollection.insertOne({
      id,
      username,
      email,
      password,
      accessToken,
      role: adminRole
    })
    const accountEmail = await sut.getByToken(accessToken, adminRole)
    expect(accountEmail).toBe(email)
  })

  test('Should return an email if role is admin and provided role is user', async() => {
    const sut = makeSut()
    await accountCollection.insertOne({
      id,
      username,
      email,
      password,
      accessToken,
      role: adminRole
    })
    const accountEmail = await sut.getByToken(accessToken, userRole)
    expect(accountEmail).toBe(email)
  })
})
