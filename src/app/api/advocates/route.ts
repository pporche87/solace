import db from "@/db"
import { advocates } from "@/db/schema"
import { sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { generateSearchWhereClause } from "./utils"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get("limit")) || 10
  const offset = Number(searchParams.get("offset")) || 0
  const searchQuery = searchParams.get("searchQuery")?.toLowerCase() ?? ""

  const whereClause = generateSearchWhereClause(searchQuery)

  const paginatedAdvocates = await db
    .select()
    .from(advocates)
    .where(whereClause ?? undefined)
    .limit(limit)
    .offset(offset)

  const totalResultCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(advocates)

  const totalCount = totalResultCount?.[0]?.count || 0

  const nextPageOffset = offset + limit

  return NextResponse.json({
    data: paginatedAdvocates,
    count: totalCount,
    limit,
    offset,
    hasMore: nextPageOffset < totalCount,
    nextOffset: nextPageOffset < totalCount ? nextPageOffset : null,
  })
}
