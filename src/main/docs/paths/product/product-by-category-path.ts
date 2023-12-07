export const productByCategoryPath = {
  get: {
    tags: ['Product'],
    summary: 'List all products by category',
    parameters: [{
      in: 'path',
      name: 'categoryName',
      required: true,
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'page',
      required: false,
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'limit',
      required: false,
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'sortBy',
      required: false,
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
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
