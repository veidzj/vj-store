export const addProductPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Product'],
    summary: 'Adds a product',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/productInput'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/success'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      409: {
        $ref: '#/components/conflict'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
