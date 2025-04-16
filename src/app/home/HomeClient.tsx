"use client"

import { memo, useCallback, useEffect, useState } from "react"
import { Advocate } from "../types/advocates"
import { logger } from "@/lib/logger"
import { API_ADVOCATES } from "../api/advocates/urls"
import { AdvocatesTable } from "../components/AdvocatesTable/AdvocatesTable"
import { getApiUrl } from "../api/apiUtils/getApiUrl"
import { getAdvocates } from "../api/advocates/utils"
import { useDebounce } from "use-debounce"
import { RESET_SEARCH, SEARCHING_FOR, SOLACE_ADVOCATES } from "./constants"
import { usePrevious } from "../hooks/usePrevious"

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
  const previousSearchTerm = usePrevious(debouncedSearchTerm)

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
    } else if (
      previousSearchTerm &&
      previousSearchTerm.length >= MIN_SEARCH_LENGTH &&
      debouncedSearchTerm.length === 0
    ) {
      logger({ tag: HOME_PAGE_TAG, message: "clearing search..." })
      fetchAdvocatesAsync()
    }
  }, [debouncedSearchTerm, previousSearchTerm, fetchAdvocatesAsync])

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
      <h1 className="text-4xl">{SOLACE_ADVOCATES}</h1>
      <div className="flex my-6 gap-2 items-center w-full">
        <input
          className="placeholder-gray-500 border p-3 rounded-md"
          placeholder="Search"
          value={searchQuery}
          onChange={onChange}
        />
        <p>
          {SEARCHING_FOR}
          <span>{searchQuery}</span>
        </p>
        <button
          className="bg-transparent hover:bg-gray-600 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded ml-auto"
          onClick={onClick}
        >
          {RESET_SEARCH}
        </button>
      </div>
      <AdvocatesTable advocates={advocates} />
    </main>
  )
}

export default memo(HomeClient)
