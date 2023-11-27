import { Kysely, sql } from 'kysely'

export async function up(db:Kysely<any>):Promise<void>{
    await db.schema
        .createTable('user')
        .ifNotExists()
            .addColumn('id', 'serial', col => col.primaryKey())
            .addColumn('name', 'varchar')
        .execute();

    await db.insertInto('user').values([ { name: "Will" }, { name: "João" } ]).execute();

    await db.schema
        .createTable('achievement')
        .ifNotExists()
            .addColumn('id', 'serial', col => col.primaryKey())
            .addColumn('icon', 'varchar')
            .addColumn('name', 'varchar', col => col.notNull())
            .addColumn('description', 'text', col => col.defaultTo(''))
            .addColumn('incremental', 'integer', col => col.notNull().defaultTo( 1 ))
            .addColumn('reveled', 'boolean', col => col.defaultTo(false))
        .execute();

    await db.insertInto('achievement').values([ 
        { name: "Estudioso", icon: "https://myday24.gumlet.io/iconikai/6564c8242a8051ff4c5b29fc/6564c9c02a8051ff4c5b2a87-aiicon.png", incremental: 10, reveled: false },
        { name: "TOP 1 :: out-23", icon: "https://myday24.gumlet.io/iconikai/6564c8242a8051ff4c5b29fc/6564ca4f2a8051ff4c5b2a98-aiicon.png", incremental: 1, reveled: false },
        { name: "TOP 10% :: out-23", icon: "https://myday24.gumlet.io/iconikai/6564c8242a8051ff4c5b29fc/6564c9a72a8051ff4c5b2a74-aiicon.png", incremental: 1, reveled: false },
    ]).execute();

    await db.schema
        .createTable('event')
        .ifNotExists()
            .addColumn('id', 'serial', col => col.primaryKey())
            .addColumn('user_id', 'integer', col => col.references('user.id').onDelete('no action').notNull() )
            .addColumn('name', 'varchar', col => col.notNull())
            .addColumn('counter', 'integer', col => col.defaultTo( 1 ))
            .addColumn('created_at', 'timestamptz', col => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    await db.schema
        .createTable('user_achievement')
        .ifNotExists()
            .addColumn('id', 'serial', col => col.primaryKey())
            .addColumn('user_id', 'integer', col => col.references('user.id').onDelete('no action').notNull() )
            .addColumn('achievement_id', 'integer', col => col.references('achievement.id').onDelete('no action').notNull() )
            .addColumn('progress', 'integer', col => col.defaultTo(0))
            .addColumn('unlocked', 'boolean', col => col.defaultTo( false ))
            .addColumn('reveled', 'boolean', col => col.defaultTo(true))
            .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
            .addColumn('unlocked_at', 'timestamptz')
        .execute();
}

export async function down(db:Kysely<any>): Promise<void>{    
    await db.schema.dropTable('user').ifExists().execute();
    await db.schema.dropTable('achievement').ifExists().execute();    
    await db.schema.dropTable('event').ifExists().execute();
    await db.schema.dropTable('user_achievement').ifExists().execute();
}