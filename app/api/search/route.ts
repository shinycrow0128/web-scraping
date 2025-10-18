import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const keyword = searchParams.get("keyword")

  if (!keyword) {
    return NextResponse.json({ error: "Keyword is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/search?keyword=${encodeURIComponent(keyword)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching from backend:", error)
    return NextResponse.json({ error: "Failed to fetch business data" }, { status: 500 })
  }
}
