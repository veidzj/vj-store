import { type Collection } from 'mongodb'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { type Express } from 'express'
import { setupApp } from '@/main/config/app'
import { env } from '@/main/config'
import { MongoHelper } from '@/infra/db/mongodb'

const categoryRoute: string = '/api/category'
const categoryData = {
  name: faker.word.words()
}

let categoryCollection: Collection
let accountCollection: Collection
let app: Express

describe('Category Routes', () => {
  beforeAll(async() => {
    app = await setupApp()
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
  })
})
