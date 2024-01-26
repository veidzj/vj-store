import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'
import MockDate from 'mockdate'

import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getErrorCollection } from '@/tests/infra/db/mongodb/log'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/log'

let errorCollection: Collection

const makeSut = (): LogErrorMongoRepository => {
  return new LogErrorMongoRepository()
}

describe('LogErrorMongoRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
    MockDate.set(new Date())
  })

  afterAll(async() => {
    await disconnectFromDatabase()
    MockDate.reset()
  })

  beforeEach(async() => {
    errorCollection = await getErrorCollection()
    await clearCollection(errorCollection)
  })

  test('Should create an error log on success', async() => {
    const sut = makeSut()
    const errorStack = faker.word.words()
    await sut.logError(errorStack)
    const errors = await errorCollection.find({}).toArray()
    expect(errors.length).toBe(1)
    expect(errors[0].stack).toBe(errorStack)
    expect(errors[0].date).toEqual(new Date())
  })
})
