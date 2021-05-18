import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateWorkspaceFormValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  /*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 */
  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({ table: 'workspaces', column: 'name' }),
      rules.required(),
      rules.maxLength(32),
    ]),
  })

  /**
	 * Custom messages for validation failures.
	 */
  public messages = {
    'name.unique': 'Workspace name not available.',
    'name.required': 'Workspace name is required.',
    'name.maxLength': 'Workspace name can\'t be more than 32 characters long.',
  }
}
