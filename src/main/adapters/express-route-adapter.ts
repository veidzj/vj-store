import { type Request, type Response } from 'express'

import { type Controller } from '@/presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async(req: Request, res: Response) => {
    const request = {
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
