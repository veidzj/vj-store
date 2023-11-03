import { type Express } from 'express'
import { type Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb'
import { setupApp } from '@/main/config'

let accountCollection: Collection
let app: Express

describe('Authentication Routes', () => {
  beforeAll(async() => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on success', async() => {
      await request(app)
        .post('/api/signup')
        .send({
          username: 'joe',
          email: 'joedoe@mail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })
})
