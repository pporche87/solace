import { advocates } from "@/db/schema"
import { ilike, or, sql } from "drizzle-orm"

export const generateSearchWhereClause = (searchQuery: string | null) => {
  return searchQuery
    ? or(
        ilike(advocates.firstName, `%${searchQuery}%`),
        ilike(advocates.lastName, `%${searchQuery}%`),
        ilike(advocates.city, `%${searchQuery}%`),
        ilike(advocates.degree, `%${searchQuery}%`),
        sql<boolean>`${advocates.specialties}::text ILIKE ${
          "%" + searchQuery + "%"
        }`,
        sql<boolean>`${advocates.yearsOfExperience}::text ILIKE ${
          "%" + searchQuery + "%"
        }`
      )
    : undefined
}
