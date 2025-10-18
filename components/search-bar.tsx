"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (keyword: string) => void
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [keyword, setKeyword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      onSearch(keyword.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for business entities..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-10 h-12 text-base"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" size="lg" disabled={isLoading || !keyword.trim()}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  )
}
