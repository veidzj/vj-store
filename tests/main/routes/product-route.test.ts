import { sign } from 'jsonwebtoken'
import request from 'supertest'
import { type Collection } from 'mongodb'
import { type Express } from 'express'
import { setupApp } from '@/main/config/app'
import { env } from '@/main/config'
import { MongoHelper } from '@/infra/db/mongodb'
import { mockAddProductInput, mockProduct } from '@/tests/domain/mocks'

const productRoute: string = '/api/product'
const productData = mockAddProductInput()

let productCollection: Collection
let categoryCollection: Collection
let accountCollection: Collection
let app: Express

const mockAccessToken = async(): Promise<string> => {
  const res = await accountCollection.insertOne({
    username: 'valid_username',
    email: 'valid_email@mail.com',
    password: 'valid_password',
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
    categoryCollection = MongoHelper.getCollection('categories')
    accountCollection = MongoHelper.getCollection('accounts')
    await productCollection.deleteMany({})
    await categoryCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /product', () => {
    test('Should return 401 if no accessToken is provided', async() => {
      await request(app)
        .post(productRoute)
        .send(productData)
        .expect(401)
    })

    test('Should return 200 if valid accessToken is provided and category exists', async() => {
      await categoryCollection.insertOne({ name: productData.category })
      const accessToken = await mockAccessToken()
      await request(app)
        .post(productRoute)
        .set('x-access-token', accessToken)
        .send(productData)
        .expect(200)
    })
  })

  describe('PUT /product/:productId', () => {
    test('Should return 401 if no accessToken is provided', async() => {
      await request(app)
        .put(productRoute + '/:productId')
        .send(productData)
        .expect(401)
    })

    test('Should return 200 if valid accessToken is provided', async() => {
      const accessToken = await mockAccessToken()
      const res = await productCollection.insertOne(mockProduct())
      await request(app)
        .put(`${productRoute}/${res.insertedId.toHexString()}`)
        .set('x-access-token', accessToken)
        .send(productData)
        .expect(200)
    })
  })
})