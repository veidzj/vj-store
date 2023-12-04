import { type Express } from 'express'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { faker } from '@faker-js/faker'
import request from 'supertest'

import { App } from '@/main/config/app'
import { env } from '@/main/config'
import { MongoHelper } from '@/infra/db/mongodb'
import { mockAddCategoryInput } from '@/tests/domain/mocks'

const categoryRoute: string = '/api/category'
const categoryData = mockAddCategoryInput()

let categoryCollection: Collection
let accountCollection: Collection
let app: Express

const mockAccessToken = async(): Promise<string> => {
  const res = await accountCollection.insertOne({
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne(
    { _id: res.insertedId },
    { $set: { accessToken } }
  )
  return accessToken
}

describe('Category Routes', () => {
  beforeAll(async() => {
    app = await App.setup()
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    categoryCollection = MongoHelper.getCollection('categories')
    accountCollection = MongoHelper.getCollection('accounts')
    await categoryCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /category', () => {
    test('Should return 401 if no accessToken is provided', async() => {
      await request(app)
        .post(categoryRoute)
        .send(categoryData)
        .expect(401)
    })

    test('Should return 200 if valid accessToken is provided', async() => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post(categoryRoute)
        .set('x-access-token', accessToken)
        .send(categoryData)
        .expect(200)
    })
  })

  describe('GET /category', () => {
    test('Should return 200 on success', async() => {
      await request(app)
        .get(categoryRoute)
        .send(categoryData)
        .expect(200)
    })
  })
})
