import {
  Kysely,
  SqliteDialect,
  Generated
} from 'kysely'
import SQLite from 'better-sqlite3'

interface DogTable {
  id: Generated<number>
  name: string
  breed: string
}

interface Database {
  dog: DogTable
}

export const db = new Kysely<Database>({
  dialect: new SqliteDialect({
    database: new SQLite('dev.db')
  })
})
