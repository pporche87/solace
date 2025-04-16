import { memo } from "react"

type HeaderProps = {
  text: string
}

export const Header = memo(({ text }: HeaderProps) => {
  return <h1 className="text-4xl">{text}</h1>
})
