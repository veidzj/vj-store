export const updateProductPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Product'],
    summary: 'Updates a product by id',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateProductInput'
          }
        }
      }
    },
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/products'
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
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
