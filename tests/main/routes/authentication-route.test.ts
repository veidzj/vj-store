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
        .send({ username: 'username' })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('email is required')
    })

    test('Should return status 400 if any field is invalid', async() => {
      const response = await request(app)
        .post('/api/signup')
        .send({
          username: 'username',
          email: 'invalid_email',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('email is invalid')
    })
  })

  describe('/signin', () => {
    test('Should return status 400 if any field is missing', async() => {
      const response = await request(app)
        .post('/api/signin')
        .send({ email: 'username@mail.com' })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('password is required')
    })
  })
})
