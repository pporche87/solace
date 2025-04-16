import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  )
}
