import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import Click from 'App/Models/Click'
import Workspace from 'App/Models/Workspace'

export default class ClicksController {
  public async getToday ({ params }: HttpContextContract) {
    const workspace = await Workspace.findByOrFail('name', params.workspaceName)
    let date = new Date()
    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    date.setDate(date.getDate() + 1)
    const tomorrow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    const clicks = await Click
      .query()
      .whereIn('linkId',
        Database
          .from('links')
          .where('workspace_id', workspace.id)
          .select('id')
      )
      .andWhereBetween('created_at', [today, tomorrow])
      .orderBy('created_at', 'asc')

    return clicks
  }
}
