import { memo } from "react"
import { Advocate } from "../../types/advocates"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import { TABLE_HEADERS } from "./constants"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"

type AdvocatesTableProps = {
  advocates: Advocate[]
}

export const AdvocatesTable = memo(({ advocates }: AdvocatesTableProps) => {
  return (
    <Table>
      <Thead>
        <Tr>
          {TABLE_HEADERS.map((headerTitle) => (
            <TableHeader key={headerTitle} title={headerTitle} />
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {advocates.map((advocate) => {
          return <TableRow key={advocate.id} advocate={advocate} />
        })}
      </Tbody>
    </Table>
  )
})
