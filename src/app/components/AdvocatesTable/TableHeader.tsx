import { memo } from "react"
import { Th } from "react-super-responsive-table"

type TableHeaderProps = {
  title: string
}

export const TableHeader = memo(({ title }: TableHeaderProps) => {
  return <Th>{title}</Th>
})
