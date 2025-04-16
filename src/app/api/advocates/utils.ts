import { advocates } from "@/db/schema"
import { ilike, or, sql } from "drizzle-orm"
import { apiFetch } from "../apiUtils/apiFetch"

export const generateAdvocatesWhereClause = (searchQuery: string | null) => {
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

export const getAdvocates = async (url: string) => {
  const response = await apiFetch(url)
  return response
}
