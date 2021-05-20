import { DateTime } from 'luxon'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import Click from 'App/Models/Click'
import Workspace from 'App/Models/Workspace'

export default class ClicksController {
  public async getToday ({ params }: HttpContextContract) {
    const workspace = await Workspace.findByOrFail('name', params.workspaceName)
    const date = new Date()
    const usersDate = DateTime.fromJSDate(date).setZone(workspace.timezone)
    const startOfDay = `${usersDate.year}-${usersDate.month}-${usersDate.day}`

    const clicks = await Click
      .query()
      .whereIn('linkId',
        Database
          .from('links')
          .where('workspace_id', workspace.id)
          .select('id')
      )
      .andWhereBetween('created_at', [startOfDay, usersDate.toString()])
      .select('created_at')
      .orderBy('created_at', 'asc')

    return clicks
  }
}
