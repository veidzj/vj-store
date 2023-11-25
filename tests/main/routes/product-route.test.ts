import request from 'supertest'
import { type Collection } from 'mongodb'
import { type Express } from 'express'
import { setupApp } from '@/main/config/app'
import { env } from '@/main/config'
import { MongoHelper } from '@/infra/db/mongodb'
import { mockAddProductInput } from '@/tests/domain/mocks'

const productRoute: string = '/api/product'
const productData = mockAddProductInput()

let productCollection: Collection
let accountCollection: Collection
let app: Express

describe('Product Routes', () => {
  beforeAll(async() => {
    app = await setupApp()
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    productCollection = MongoHelper.getCollection('products')
    accountCollection = MongoHelper.getCollection('accounts')
    await productCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /product', () => {
    test('Should return 401 if no accessToken is provided', async() => {
      await request(app)
        .post(productRoute)
        .send(productData)
        .expect(401)
    })
  })
})
