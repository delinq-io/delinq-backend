
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  /**
   * Return all workspaces of user (owner/member)
   */
  public async getWorkspaces ({ auth }: HttpContextContract) {
    const user = auth.user!

    const data = await user
      .related('workspaces')
      .query()
      .where('user_id', user.id)

    const workspaceList = [] as object[]
    data.forEach(ws => {
      workspaceList.push({
        id: ws.id,
        name: ws.name,
      })
    })

    return workspaceList
  }
}

