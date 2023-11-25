import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { MongoHelper } from '@/infra/db/mongodb'
import { LogMongoRepository } from '@/infra/db/mongodb/dynamic/log'
import { env } from '@/main/config'

let errorCollection: Collection

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async() => {
    const sut = makeSut()
    await sut.logError(faker.word.words())
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
