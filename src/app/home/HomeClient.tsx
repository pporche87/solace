"use client"

import { memo, useCallback, useEffect, useState } from "react"
import { Advocate } from "../types/advocates"
import { logger } from "@/lib/logger"
import { API_ADVOCATES } from "../api/advocates/urls"
import { AdvocatesTable } from "../components/AdvocatesTable"
import { getApiUrl } from "../api/apiUtils/getApiUrl"
import { getAdvocates } from "../api/advocates/utils"
import { useDebounce } from "use-debounce"

const HOME_PAGE_TAG = "Home"
const DEBOUNCE_INTERVAL = 400
const MIN_SEARCH_LENGTH = 2

type HomeClientProps = {
  initialAdvocates: Advocate[]
}

function HomeClient({ initialAdvocates }: HomeClientProps) {
  const [advocates, setAdvocates] = useState<Advocate[]>(initialAdvocates)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [debouncedSearchTerm] = useDebounce(searchQuery, DEBOUNCE_INTERVAL)

  const fetchAdvocatesAsync = useCallback(async (query: string = "") => {
    const advocatesUrl = getApiUrl(API_ADVOCATES, {
      searchQuery: query,
      limit: 10,
      offset: 0,
    })

    const response = await getAdvocates(advocatesUrl)
    setAdvocates(response?.data)
  }, [])

  useEffect(() => {
    if (debouncedSearchTerm.length >= MIN_SEARCH_LENGTH) {
      logger({ tag: HOME_PAGE_TAG, message: "fetching filtered advocates..." })
      fetchAdvocatesAsync(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    logger({ tag: HOME_PAGE_TAG, message: "user typing..." })
  }, [])

  const onClick = useCallback(() => {
    setSearchQuery("")
    fetchAdvocatesAsync("") // Optional: reset to unfiltered list
    logger({ tag: HOME_PAGE_TAG, message: "Reset search triggered" })
  }, [])

  return (
    <main className="m-6">
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchQuery}</span>
        </p>
        <input className="border border-black" onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <AdvocatesTable advocates={advocates} />
    </main>
  )
}

export default memo(HomeClient)
