import { type Express } from 'express'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'
import { setupApp } from '@/main/config'
import { MongoHelper } from '@/infra/db/mongodb'

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

    test('Should return 403 if email is already in use', async() => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        username: 'joe',
        email: 'joedoe@mail.com',
        password
      })
      await request(app)
        .post('/api/signup')
        .send({
          username: 'joe',
          email: 'joedoe@mail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(403)
    })
  })

  describe('POST /signin', () => {
    test('Should return 200 on success', async() => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        username: 'joe',
        email: 'joedoe@mail.com',
        password
      })
      await request(app)
        .post('/api/signin')
        .send({
          email: 'joedoe@mail.com',
          password: '123456'
        })
        .expect(200)
    })

    test('Should return 401 if credentials are invalid', async() => {
      await request(app)
        .post('/api/signin')
        .send({
          email: 'joedoe@mail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
