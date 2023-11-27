import * as path from 'path'
import { promises as fs } from 'fs'

import { Kysely, Migrator, PostgresDialect, FileMigrationProvider, } from 'kysely'
import { Pool } from 'pg'

async function migrateToLatest() {
  const db = new Kysely<any>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: 'postgres://postgres:1234@localhost/vestibulinho'
      })
    }),
  })

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.info(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()

  console.info("Migrate executado.");
}

migrateToLatest()