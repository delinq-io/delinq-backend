import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {
  UserFactory,
  WorkspaceFactory,
  ClickFactory,
  LinkFactory,
} from 'Database/factories'

export default class AdminSeeder extends BaseSeeder {
  public async run () {
    const user = await UserFactory
      .merge({
        email: 'user@example.org',
        password: 'password',
        username: 'User',
        accountStatus: 'active',
      })
      .create()

    const workspace = await WorkspaceFactory
      .merge({ name: 'TestWorkspace' })
      .create()

    await user
      .related('workspaces')
      .attach({ [workspace.id]: { role: 'owner' } })

    const link1 = await LinkFactory
      .merge({ workspaceId: workspace.id })
      .create()
    const link2 = await LinkFactory
      .merge({ workspaceId: workspace.id })
      .create()

    await user
      .related('links')
      .saveMany([link1, link2])

    await ClickFactory
      .merge({ linkId: link1.id })
      .createMany(200)
    await ClickFactory
      .merge({ linkId: link2.id })
      .createMany(200)
  }
}
