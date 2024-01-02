import { type Response } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors'

export class HttpHelper {
  public static ok(data: object): Response {
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

  public static notFound(error: Error): Response {
    return {
      statusCode: 404,
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
