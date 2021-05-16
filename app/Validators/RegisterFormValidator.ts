import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterFormValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  /*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 */
  public schema = schema.create({
    username: schema.string({}, [
      rules.unique({ table: 'users', column: 'username' }),
      rules.required(),
      rules.maxLength(32),
    ]),
    email: schema.string({}, [
      rules.unique({ table: 'users', column: 'email' }),
      rules.required(),
      rules.maxLength(255),
      rules.email(),
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.maxLength(64),
    ]),
  })

  /**
	 * Custom messages for validation failures.
	 */
  public messages = {
    'username.unique': 'Username already used.',
    'username.required': 'Your username is required.',
    'username.maxLength': 'Your username can\'t be more than 32 characters long.',
    'email.unique': 'Email already used.',
    'email.required': 'Your email is required.',
    'email.maxLength': 'Your email can\'t be more than 255 characters long.',
    'email.email': 'Your email isn\'t valid.',
    'password.required': 'Password is required.',
    'password.maxLength': 'Your password can\'t be more than 255 characters long.',
  }
}
