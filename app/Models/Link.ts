import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeSave,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'
import Click from 'App/Models/Click'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title?: string

  @column()
  public longUrl: string

  @column()
  public key: string
  @beforeSave()
  public static async generateKey (link: Link) {
    if (!link.key) {
      link.key = await generateUniqueKey(5)
    }
  }

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public workspaceId: number

  @hasMany(() => Click)
  public clicks: HasMany<typeof Click>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

/**
 * Generate a random link key
 */
async function generateUniqueKey (length) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789'
  let exists; let result = ''

  do {
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    // check if hash already exists
    exists = await Link.findBy('key', result)
  } while (exists)

  return Promise.resolve(result)
}
