import 'server-only'
import postgres from 'postgres'

// Singleton connection pool — reused across hot-reloads in dev.
declare global {
  // eslint-disable-next-line no-var
  var __sql: ReturnType<typeof postgres> | undefined
}

function createPool() {
  return postgres(process.env.POSTGRES_URL!, {
    ssl: 'require',
    max: 5,
  })
}

export const sql: ReturnType<typeof postgres> =
  globalThis.__sql ?? (globalThis.__sql = createPool())
