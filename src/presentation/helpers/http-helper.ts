import { type HttpResponse } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors'

export class HttpHelper {
  public static ok(data: any): HttpResponse {
    return {
      statusCode: 200,
      body: data
    }
  }

  public static badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }

  public static unauthorized(error: Error): HttpResponse {
    return {
      statusCode: 401,
      body: error
    }
  }

  public static forbidden(error: Error): HttpResponse {
    return {
      statusCode: 403,
      body: error
    }
  }

  public static serverError(error: Error): HttpResponse {
    return {
      statusCode: 500,
      body: new ServerError(error.stack)
    }
  }
}
