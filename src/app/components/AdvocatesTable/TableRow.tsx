import { Advocate } from "@/app/types/advocates"
import { memo } from "react"
import { Td, Tr } from "react-super-responsive-table"
import { TABLE_ENTRIES } from "./constants"

type TableRow = {
  advocate: Advocate
}

export const TableRow = memo(({ advocate }: TableRow) => {
  return (
    <Tr key={advocate.id} className="border border-solid border-black">
      {TABLE_ENTRIES.map(([key, label]) => {
        const value = advocate[key as keyof Advocate]

        return (
          <Td key={key} className="pivoted align-top">
            <span className="tdBefore">{label}</span>

            {key === "specialties" && Array.isArray(value) ? (
              <ul className="space-y-1 mt-1">
                {value.map((s) => (
                  <li key={s} className="block">
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <span>{value}</span>
            )}
          </Td>
        )
      })}
    </Tr>
  )
})
