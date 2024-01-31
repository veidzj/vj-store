import { faker } from '@faker-js/faker'

import { GetProductBySlugController } from '@/presentation/controllers/product/queries'
import { type ProductOutput } from '@/domain/entities/product/dto'
import { type GetProductBySlug } from '@/domain/usecases/product/queries'

const mockRequest = (): GetProductBySlugController.Request => ({
  slug: faker.word.words()
})

describe('GetProductBySlugController', () => {
  test('Should call GetProductBySlug with corret value', async() => {
    class GetProductBySlugSpy implements GetProductBySlug {
      public slug: string
      public output: ProductOutput

      public async getBySlug(slug: string): Promise<ProductOutput> {
        this.slug = slug
        return this.output
      }
    }
    const getProductBySlugSpy = new GetProductBySlugSpy()
    const sut = new GetProductBySlugController(getProductBySlugSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(getProductBySlugSpy.slug).toBe(request.slug)
  })
})
