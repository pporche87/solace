import {
  RESET_SEARCH,
  SEARCHING_FOR,
  SEARCH_PLACEHOLDER,
} from "@/app/home/constants"
import { memo } from "react"

type SearchProps = {
  searchQuery: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

export const Search = memo(
  ({ searchQuery, onChange, onClick }: SearchProps) => {
    return (
      <div className="flex my-6 gap-2 items-center w-full">
        <input
          className="placeholder-gray-500 border p-3 rounded-md"
          placeholder={SEARCH_PLACEHOLDER}
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
    )
  }
)
