import { type GetProductBySlug } from '@/domain/usecases/product/queries'
import { DbGetProductBySlug } from '@/application/usecases/product/queries'
import { GetProductBySlugMongoRepository } from '@/infra/db/mongodb/product/queries'

export class GetProductBySlugFactory {
  public static readonly makeGetProductBySlug = (): GetProductBySlug => {
    const getProductBySlugRepository = new GetProductBySlugMongoRepository()
    return new DbGetProductBySlug(getProductBySlugRepository)
  }
}
