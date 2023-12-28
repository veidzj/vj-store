import { type Response } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors'

export class HttpHelper {
  public static badRequest(error: Error): Response {
    return {
      statusCode: 400,
      body: error
    }
  }

  public static unauthorized(error: Error): Response {
    return {
      statusCode: 401,
      body: error
    }
  }

  public static conflict(error: Error): Response {
    return {
      statusCode: 409,
      body: error
    }
  }

  public static serverError(error: Error): Response {
    return {
      statusCode: 500,
      body: new ServerError(error.stack)
    }
  }
}
