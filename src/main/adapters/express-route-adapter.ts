import { type Request, type Response } from 'express'

import { type Controller } from '@/presentation/protocols'

export class ExpressRouteAdapter {
  public static adapt = (controller: Controller): (req: Request, res: Response) => Promise<void> => {
    return async(req: Request, res: Response): Promise<void> => {
      const request: object = {
        ...(req.body || {}),
        ...(req.params || {}),
        ...(req.query || {})
      }
      const httpResponse = await controller.handle(request)
      const { statusCode, body } = httpResponse
      if (statusCode >= 200 && statusCode <= 299) {
        res.status(statusCode).json(body)
      } else {
        res.status(statusCode).json({
          message: body.message
        })
      }
    }
  }
}
