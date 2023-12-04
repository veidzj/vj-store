import { type Request, type Response, type NextFunction } from 'express'

import { type Middleware } from '@/presentation/protocols'

export class ExpressMiddlewareAdapter {
  public static adapt = (middleware: Middleware): (req: Request, res: Response, next: NextFunction) => Promise<void> => {
    return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
      const request = {
        accessToken: req.headers?.['x-access-token'],
        ...(req.headers || {})
      }
      const httpResponse = await middleware.handle(request)
      if (httpResponse.statusCode === 200) {
        Object.assign(req, httpResponse.body)
        next()
      } else {
        res.status(httpResponse.statusCode).json({
          message: httpResponse.body.message
        })
      }
    }
  }
}
