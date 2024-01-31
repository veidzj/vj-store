export const getProductsByCategoryPath = {
  get: {
    tags: ['Product'],
    summary: 'List all products by category',
    parameters: [{
      in: 'path',
      name: 'category',
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
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/productOutput'
            }
          }
        }
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
