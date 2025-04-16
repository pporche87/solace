import { useInfiniteQuery } from "@tanstack/react-query"
import { getApiUrl } from "../apiUtils/getApiUrl"
import { API_ADVOCATES } from "./urls"
import { getAdvocates } from "./utils"
import { useEffect, useRef } from "react"

const PAGE_SIZE = 10
const ADVOCATES_QUERY_KEY = "advocates"

export const useAdvocatesQuery = (searchQuery: string) => {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: [ADVOCATES_QUERY_KEY, searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      const url = getApiUrl(API_ADVOCATES, {
        searchQuery,
        limit: PAGE_SIZE,
        offset: pageParam as number,
      })

      const res = await getAdvocates(url)
      return res?.data ?? []
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flat().length
      return lastPage.length < PAGE_SIZE ? undefined : totalFetched
    },
  })
}

export const useInfiniteScroll = (callback: () => void, hasNext: boolean) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNext || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && callback(),
      { threshold: 1.0 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref.current, callback, hasNext])

  return ref
}
