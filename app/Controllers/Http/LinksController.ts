import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateLinkFormValidator from 'App/Validators/CreateLinkFormValidator'
import Link from 'App/Models/Link'
import Workspace from 'App/Models/Workspace'
import Click from 'App/Models/Click'

export default class LinksController {
  /**
   * Create a new link
   */
  public async create ({ request, auth }: HttpContextContract) {
    const data = await request.validate(CreateLinkFormValidator)
    const user = auth.user!

    const workspace = await Workspace
      .query()
      .where('name', request.input('workspaceName'))
      .firstOrFail()

    const link = new Link()
    link.workspaceId = workspace.id
    link.longUrl = data.url
    if (data.title) { link.title = data.title }
    if (data.key) { link.key = data.key }

    await user
      .related('links')
      .save(link)

    return link
  }

  /**
   * Get link by its key 
   */
  public async getByKey ({ response, params }: HttpContextContract) {
    const key = params.key
    const link = await Link.findByOrFail('key', key)
    await Click.create({ linkId: link.id })
    return response.redirect(link.longUrl)
  }
}
