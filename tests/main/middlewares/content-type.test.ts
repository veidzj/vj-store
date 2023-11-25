import { type Express } from 'express'
import request from 'supertest'

import { setupApp } from '@/main/config'

const route: string = '/test_content_type'
const routeXml: string = '/test_content_type_xml'

let app: Express

describe('ContentType Middleware', () => {
  beforeAll(async() => {
    app = await setupApp()
  })

  test('Should return default content type as json', async() => {
    app.get(route, (req, res) => {
      res.send()
    })
    await request(app)
      .get(route)
      .expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async() => {
    app.get(routeXml, (req, res) => {
      res.type('xml')
      res.send()
    })
    await request(app)
      .get(routeXml)
      .expect('content-type', /xml/)
  })
})
