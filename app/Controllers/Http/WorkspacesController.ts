import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateWorkspaceFormValidator from 'App/Validators/CreateWorkspaceFormValidator'
import Workspace from 'App/Models/Workspace'

export default class WorkspacesController {
  /**
   * Create a new workspace
   */
  public async create ({ request, auth }: HttpContextContract) {
    const data = await request.validate(CreateWorkspaceFormValidator)
    const user = auth.user!

    const workspace = await Workspace.create(data)
    await user
      .related('workspaces')
      .attach({ [workspace.id]: { role: 'owner' }})

    return workspace
  }

  /**
   * Get a workspace by its name
   */
  public async getByName ({ params }: HttpContextContract) {
    const workspace = await Workspace
      .query()
      .where('name', decodeURI(params.name))
      .preload('members', (query) => query.pivotColumns(['role']))
      .firstOrFail()

    return workspace
  }
}
