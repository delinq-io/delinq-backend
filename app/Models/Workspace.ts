import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'
import Link from 'App/Models/Link'

export default class Workspace extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => User, { pivotColumns: ['role'] })
  public members: ManyToMany<typeof User>

  @hasMany(() => Link)
  public links: HasMany<typeof Link>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serializeExtras () {
    return {
      role: this.$extras.pivot_role,
    }
  }
}
