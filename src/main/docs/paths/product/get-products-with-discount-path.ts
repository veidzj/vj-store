export const getProductsWithDiscountPath = {
  get: {
    tags: ['Product'],
    summary: 'List all products with discount ordered by most discount',
    parameters: [{
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
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
