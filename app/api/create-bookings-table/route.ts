import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Create Supabase client with service role for admin access
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // SQL to create the bookings table
    const sql = `
      -- Create bookings table if it doesn't exist
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        project_id TEXT NOT NULL,
        project_name TEXT NOT NULL,
        location TEXT NOT NULL,
        visit_date DATE NOT NULL,
        visit_time TEXT NOT NULL,
        visitors INTEGER NOT NULL,
        transportation TEXT NOT NULL,
        special_requests TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        booking_reference TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create index for faster queries
      CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON bookings(user_id);
      CREATE INDEX IF NOT EXISTS bookings_visit_date_idx ON bookings(visit_date);
      CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);

      -- Enable Row Level Security
      ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

      -- Create policies
      DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
      CREATE POLICY "Users can view their own bookings" 
        ON bookings FOR SELECT 
        USING (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
      CREATE POLICY "Users can insert their own bookings" 
        ON bookings FOR INSERT 
        WITH CHECK (auth.uid() = user_id);

      DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;
      CREATE POLICY "Users can update their own bookings" 
        ON bookings FOR UPDATE 
        USING (auth.uid() = user_id);

      -- Grant permissions to authenticated users
      GRANT SELECT, INSERT, UPDATE ON bookings TO authenticated;
    `

    // Execute the SQL
    const { error } = await supabase.rpc("execute_sql", { sql })

    if (error) {
      console.error("Error creating bookings table:", error)
      return NextResponse.json({ error: "Failed to create bookings table", details: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Bookings table created successfully" })
  } catch (error) {
    console.error("Unhandled error creating bookings table:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
