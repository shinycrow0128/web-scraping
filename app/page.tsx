"use client"

import { useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { BusinessTable } from "@/components/business-table"
import { Building2 } from "lucide-react"

interface BusinessEntity {
  business_id: string
  entity_name: string
  business_address: string
  mailing_address: string
  date_formed: string
  naics_code: string
  business_email: string
  principal_name: string
}

export default function Home() {
  const [results, setResults] = useState<BusinessEntity[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (keyword: string) => {
    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`)

      if (!response.ok) {
        throw new Error("Failed to fetch business data")
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight text-balance">Connecticut Business Search</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Search and explore business entities registered in Connecticut. Get detailed information including
            addresses, NAICS codes, and principal contacts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-center">{error}</p>
          </div>
        )}

        {/* Results */}
        {hasSearched && !isLoading && !error && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground text-center">
              Found {results.length} {results.length === 1 ? "result" : "results"}
            </p>
          </div>
        )}

        {/* Business Table */}
        {results.length > 0 && <BusinessTable data={results} />}

        {/* No Results */}
        {hasSearched && !isLoading && results.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No businesses found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  )
}
