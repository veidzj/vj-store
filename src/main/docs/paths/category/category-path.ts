export const categoryPath = {
  get: {
    tags: ['Category'],
    summary: 'List all categories',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/categories'
            }
          }
        }
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Category'],
    summary: 'Adds a category',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addCategoryInput'
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
              $ref: '#/schemas/account'
            }
          }
        }
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
