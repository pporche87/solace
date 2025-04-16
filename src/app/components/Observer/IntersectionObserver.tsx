"use client"

import { forwardRef } from "react"

export const IntersectionObserver = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref} className="h-8" />
})
