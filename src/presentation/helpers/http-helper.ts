import { type Response } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors'

export class HttpHelper {
  public static ok(data: any): Response {
    return {
      statusCode: 200,
      body: data
    }
  }

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

  public static forbidden(error: Error): Response {
    return {
      statusCode: 403,
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
