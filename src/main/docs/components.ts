import { apiKeyAuthSchema } from '@/main/docs/schemas/account'
import { badRequest, unauthorized, notFound, conflict, serverError } from '@/main/docs/components/http'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  unauthorized,
  notFound,
  conflict,
  serverError
}
