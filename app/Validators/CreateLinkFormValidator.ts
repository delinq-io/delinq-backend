import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateLinkFormValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  /*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 */
  public schema = schema.create({
    url: schema.string({}, [
      rules.required(),
      rules.url(),
      rules.minLength(2),
      rules.maxLength(512),
    ]),
    title: schema.string.optional({}, [
      rules.minLength(1),
      rules.maxLength(64),
    ]),
    key: schema.string.optional({}, [
      rules.unique({ table: 'links', column: 'key' }),
      rules.minLength(1),
      rules.maxLength(512),
    ]),
    workspaceName: schema.string({}, [
      rules.required(),
      rules.exists({ table: 'workspaces', column: 'name' }),
    ]),
  })

  /**
	 * Custom messages for validation failures.
	 */
  public messages = {
    'url.required': 'Please provide an URL to shorten.',
    'url.url': 'Please provide a valid URL.',
    'url.minLength': 'Your link can\'t be less than 5 characters long.',
    'url.maxLength': 'Your link can\'t be more than 512 characters long.',
    'title.minLength': 'Link\'s title can\'t be less than 1 character long.',
    'title.maxLength': 'Link\'s title can\'t be more than 64 characters long.',
    'key.unique': 'This link\'s key already exists.',
    'key.minLength': 'Link\'s key can\'t be less than 1 character long.',
    'key.maxLength': 'Link\'s key can\'t be more than 512 characters long.',
    'workspaceName.required': 'Missing workspace name.',
    'workspaceName.exists': 'Invalid workspace name',
  }
}
