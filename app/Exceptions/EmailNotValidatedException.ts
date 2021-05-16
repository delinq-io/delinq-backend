import { Exception } from '@poppinss/utils'
// import { Exception } from '@adonisjs/core'

const code = 'E_EMAIL_NOT_VALIDATED'
const status = 401
const message = 'Please verify your email address.'

export default class EmailNotValidatedException extends Exception {
  constructor () {
    super(message, status, code)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  handle (_: any, { response }: any) {
    return response.status(status).send({
      errors: [{
        status: status,
        code: code,
        message: message,
      }],
    })
  }
}
