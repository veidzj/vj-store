import { type Express } from 'express'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { faker } from '@faker-js/faker'
import request from 'supertest'

import { App } from '@/main/config/app'
import { env } from '@/main/config'
import { MongoHelper } from '@/infra/db/mongodb'
import { mockAddProductInput, mockProduct, mockProducts } from '@/tests/domain/mocks'

const productRoute: string = '/api/product'
const productData = mockAddProductInput()

let productCollection: Collection
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

describe('Product Routes', () => {
  beforeAll(async() => {
    app = await App.setup()
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

  describe('PUT /product/:id', () => {
    test('Should return 401 if no accessToken is provided', async() => {
      await request(app)
        .put(productRoute + '/:id')
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

  describe('GET /product/slug/:slug', () => {
    test('Should return 200 on success', async() => {
      const insertQuery = await productCollection.insertOne(mockProduct())
      const res = await productCollection.findOne({ _id: insertQuery.insertedId })
      await request(app)
        .get(`${productRoute}/slug/${res?.slug}`)
        .expect(200)
    })
  })

  describe('GET /product/category/:category', () => {
    test('Should return 200 on success', async() => {
      const mockProductsInput = mockProducts()
      await categoryCollection.insertOne({ name: mockProductsInput[0].category })
      await productCollection.insertMany(mockProducts())
      await request(app)
        .get(`${productRoute}/category/${mockProductsInput[0].category}`)
        .expect(200)
    })
  })
})
