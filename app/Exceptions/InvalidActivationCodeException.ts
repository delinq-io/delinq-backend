import { Exception } from '@poppinss/utils'

const code = 'E_INVALID_ACTIVATION_CODE_EXCEPTION'
const status = 401
const message = 'Incorrect activation code.'

export default class InvalidActivationCodeException extends Exception {
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
