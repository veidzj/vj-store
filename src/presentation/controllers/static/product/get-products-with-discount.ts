import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetProductsWithDiscount } from '@/domain/usecases/static/product'

export class GetProductsWithDiscountController implements Controller {
  constructor(private readonly getProductsWithDiscount: GetProductsWithDiscount) {}

  public handle = async(): Promise<Response> => {
    try {
      const products = await this.getProductsWithDiscount.getWithDiscount()
      return HttpHelper.ok(products)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
