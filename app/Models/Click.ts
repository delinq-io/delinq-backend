import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Click extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public linkId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
