export const signInPath = {
  post: {
    tags: ['Account'],
    summary: 'Authenticates an user account',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signInInput'
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
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
