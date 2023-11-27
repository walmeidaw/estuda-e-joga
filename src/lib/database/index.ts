import { DB } from '@/lib/database/db';

import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

export const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: ( process?.env?.POSTGRES_URL || 'postgres://postgres:1234@localhost/vestibulinho' ),
            ssl: process?.env?.POSTGRES_URL ? true : false
        })
    })
});

export { sql } from 'kysely';