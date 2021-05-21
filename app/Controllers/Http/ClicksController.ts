import { DateTime } from 'luxon'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import Click from 'App/Models/Click'
import Workspace from 'App/Models/Workspace'

export default class ClicksController {
  public async getDate ({ params }: HttpContextContract) {
    const workspace = await Workspace.findByOrFail('name', params.workspaceName)
    const startDate = DateTime.fromFormat(params.date, 'yyyy-MM-dd').setZone(workspace.timezone)
    const endDate = DateTime.fromObject({
      year: startDate.year, month: startDate.month, day: startDate.day,
      hour: 23, minute: 59, second: 59,
    }).setZone(workspace.timezone)

    const clicks = await Click
      .query()
      .whereIn('linkId',
        Database
          .from('links')
          .where('workspace_id', workspace.id)
          .select('id')
      )
      .andWhereBetween('created_at', [startDate.toString(), endDate.toString()])
      .select('created_at')
      .orderBy('created_at', 'asc')

    return clicks
  }
}
