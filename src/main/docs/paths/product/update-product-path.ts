export const updateProductPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Product'],
    summary: 'Updates a product',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/productInput'
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
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
