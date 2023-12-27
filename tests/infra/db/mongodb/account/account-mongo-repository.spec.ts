import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb'
import { AccountMongoRepository } from '@/infra/db/mongodb/account'
import { mockAccount } from '@/tests/domain/mocks/account'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
  const mongoHelper: MongoHelper = MongoHelper.getInstance()

  beforeAll(async() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async() => {
    await mongoHelper.disconnect()
  })

  beforeEach(async() => {
    accountCollection = mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('AddAccountRepository', () => {
    test('Should throw if mongo throws', async() => {
      const sut = makeSut()
      jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.add(mockAccount())
      await expect(promise).rejects.toThrow()
    })
  })
})
