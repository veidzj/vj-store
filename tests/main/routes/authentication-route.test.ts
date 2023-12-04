import { type Express } from 'express'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { faker } from '@faker-js/faker'
import request from 'supertest'

import { env, App } from '@/main/config'
import { MongoHelper } from '@/infra/db/mongodb'

const signUpRoute: string = '/api/signup'
const signInRoute: string = '/api/signin'
const password: string = faker.internet.password()
const signUpData = {
  username: faker.person.firstName(),
  email: faker.internet.email(),
  password,
  passwordConfirmation: password
}
const signInData = {
  email: signUpData.email,
  password
}

let accountCollection: Collection
let app: Express

describe('Authentication Routes', () => {
  beforeAll(async() => {
    app = await App.setup()
    await MongoHelper.connect(env.mongoUrl)
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
        .post(signUpRoute)
        .send(signUpData)
        .expect(200)
    })

    test('Should return 401 if email is already in use', async() => {
      const password = await hash(signUpData.password, 12)
      await accountCollection.insertOne({
        username: signUpData.username,
        email: signUpData.email,
        password
      })
      await request(app)
        .post(signUpRoute)
        .send(signUpData)
        .expect(401)
    })
  })

  describe('POST /signin', () => {
    test('Should return 200 on success', async() => {
      const password = await hash(signUpData.password, 12)
      await accountCollection.insertOne({
        username: signUpData.username,
        email: signUpData.email,
        password
      })
      await request(app)
        .post(signInRoute)
        .send(signInData)
        .expect(200)
    })

    test('Should return 401 if credentials are invalid', async() => {
      await request(app)
        .post(signInRoute)
        .send(signInData)
        .expect(401)
    })
  })
})
