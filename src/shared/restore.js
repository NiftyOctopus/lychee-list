
export async function restore(db, data) {
    await putRecords(db, data)
}

async function putRecords(db, data) {
    for(let table of ['items', 'recipes']) {
        for(let record of data[table]) {
            if(await skip(db, table, record)) continue
            await putOne(db, table, record)
        }
    }
}

async function skip(db, table, record) {
    const existing = await db[table].get(record.id)
    if(!existing) return false
    return existing.updated > record.updated
}

async function putOne(db, table, record) {
    try {
        await db[table].put(record)
    }
    catch(e) {
        if(e.name === 'ConstraintError') {
            await handleConstraintError(db, table, record)

        } else { throw e }
    }
}

async function handleConstraintError(db, table, record) {
    // TODO: Add a check to prevent infinite loop
    await putOne(db, table, {
        ...record,
        name: record.name + '*',
        updated: new Date().toISOString()
    })
}