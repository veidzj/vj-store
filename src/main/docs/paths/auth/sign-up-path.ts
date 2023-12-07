export const signUpPath = {
  post: {
    tags: ['Auth'],
    summary: 'Adds an user account',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpInput'
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
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
