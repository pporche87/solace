import { logger } from "@/lib/logger"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const DB_SETUP_TAG = "Setup DB"
const DB_URL_NO_SET = "DATABASE_URL is not set"

const setup = () => {
  if (!process.env.DATABASE_URL) {
    logger({
      tag: DB_SETUP_TAG,
      message: DB_URL_NO_SET,
      level: "error",
    })
    throw new Error(DB_URL_NO_SET)
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL)
  const db = drizzle(queryClient)
  return db
}

export default setup()
