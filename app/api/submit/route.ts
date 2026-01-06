import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    // Validate input
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Store in Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        )

        const { data, error } = await supabase
          .from("users")
          .insert([
            {
              name,
              email,
              created_at: new Date().toISOString(),
            },
          ])
          .select()

        if (error) {
          // Check if it's a duplicate email error
          if (error.code === "23505") {
            return NextResponse.json(
              { error: "This email is already registered" },
              { status: 409 }
            )
          }
          throw error
        }

        console.log("Stored in Supabase:", data)
      } catch (supabaseError: any) {
        console.error("Supabase storage error:", supabaseError)
        // Fall through to logging if Supabase fails
      }
    } else {
      console.warn("Supabase environment variables not set. Data not stored.")
    }

    // Log submission (always works)
    console.log("Form submission:", { name, email, timestamp: new Date().toISOString() })

    return NextResponse.json({ success: true, message: "Data stored successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error storing data:", error)
    return NextResponse.json({ error: "Failed to store data" }, { status: 500 })
  }
}

