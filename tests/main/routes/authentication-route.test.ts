import { type Express } from 'express'
import request from 'supertest'
import { setupApp } from '@/main/config/app'

let app: Express

describe('Authentication Route', () => {
  beforeAll(async() => {
    app = await setupApp()
  })

  describe('/signup', () => {
    test('Should return status 400 if any field is missing', async() => {
      const response = await request(app)
        .post('/api/signup')
        .send({ username: 'any_name' })
      expect(response.statusCode).toBe(400)
    })
  })
})
