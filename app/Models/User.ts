import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import Workspace from 'App/Models/Workspace'
import Link from 'App/Models/Link'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public username: string

  @column()
  public avatarUrl: string

  @column()
  public activationCode?: string

  @column()
  public accountStatus: string

  @column.dateTime()
  public lastLogin: DateTime

  @column()
  public rememberMeToken?: string

  @manyToMany(() => Workspace, { pivotColumns: ['role'] })
  public workspaces: ManyToMany<typeof Workspace>

  @hasMany(() => Link)
  public links: HasMany<typeof Link>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public serializeExtras () {
    return {
      role: this.$extras.pivot_role,
    }
  }
}

