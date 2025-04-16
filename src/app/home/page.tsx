"use client"

import { memo, useCallback, useState } from "react"
import { logger } from "@/lib/logger"
import { AdvocatesTable } from "../components/AdvocatesTable/AdvocatesTable"
import { useDebounce } from "use-debounce"
import { LOG_MESSAGES, SOLACE_ADVOCATES } from "./constants"
import { useAdvocatesQuery, useInfiniteScroll } from "../api/advocates/hooks"
import { Search } from "../components/Search/Search"
import { Header } from "../components/Typography/Header"
import { IntersectionObserver } from "../components/Observer/IntersectionObserver"

const HOME_PAGE_TAG = "Home"
const DEBOUNCE_INTERVAL = 400

function HomeClient() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [debouncedSearchTerm] = useDebounce(searchQuery, DEBOUNCE_INTERVAL)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useAdvocatesQuery(debouncedSearchTerm)

  const advocates = data?.pages.flat() ?? []

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    logger({ tag: HOME_PAGE_TAG, message: LOG_MESSAGES.userTyping })
  }, [])

  const onClick = useCallback(() => {
    setSearchQuery("")
    logger({ tag: HOME_PAGE_TAG, message: LOG_MESSAGES.resetSearch })
  }, [])

  const loadMoreRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, hasNextPage)

  return (
    <main className="m-6">
      <Header text={SOLACE_ADVOCATES} />
      <Search searchQuery={searchQuery} onChange={onChange} onClick={onClick} />
      <AdvocatesTable advocates={advocates} />
      <IntersectionObserver ref={loadMoreRef} />
    </main>
  )
}

export default memo(HomeClient)
