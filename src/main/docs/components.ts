import { apiKeyAuthSchema } from '@/main/docs/schemas/auth'
import { badRequest, unauthorized, forbidden, serverError } from '@/main/docs/components/http'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  unauthorized,
  forbidden,
  serverError
}
