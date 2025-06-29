# Client/Server Code Separation Pattern

## Core Principles

1. **Explicit Boundaries**: Clearly mark code as client-only or server-only
2. **File Organization**: Separate client and server code into distinct files
3. **Naming Conventions**: Use consistent naming to identify client/server code
4. **Type Safety**: Leverage TypeScript to prevent mixing server and client code
5. **Error Handling**: Gracefully handle failures in both environments

## File Structure

\`\`\`
lib/
├── supabase/
│   ├── client-only.ts       # Client-safe Supabase instance
│   ├── server.ts            # Server-only Supabase utilities
│   └── server-actions.ts    # Server actions for data mutations
├── services/
│   ├── announcement-service.ts        # Client-safe service
│   └── announcement-service.server.ts # Server-only service
└── context/
    └── auth-context.tsx     # Client-only context provider
\`\`\`

## Naming Conventions

- **Client Files**: Base name (e.g., `client.ts`, `announcement-service.ts`)
- **Server Files**: Base name + `.server` suffix (e.g., `server.ts`, `announcement-service.server.ts`)
- **Shared Types**: Base name + `.types` suffix (e.g., `announcement.types.ts`)

## Code Markers

Always mark client components with the `'use client'` directive at the top of the file:

\`\`\`tsx
'use client'

import { useState } from 'react'
// Rest of client component code
\`\`\`

Mark server-only code with the `'use server'` directive for server actions:

\`\`\`tsx
'use server'

import { cookies } from 'next/headers'
// Rest of server action code
\`\`\`

## Supabase Integration

### Client-Side Supabase

\`\`\`tsx
// lib/supabase/client-only.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../types/database'

// Create a singleton to avoid multiple instances
let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabaseBrowser() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return supabaseClient
}

// Export a pre-initialized client for direct imports
export const supabase = getSupabaseBrowser()
\`\`\`

### Server-Side Supabase

\`\`\`tsx
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '../types/database'

export function getServerSupabase() {
  const cookieStore = cookies()
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle the error or just ignore it
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // Handle the error or just ignore it
          }
        },
      },
    }
  )
}

export function getServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
\`\`\`

## Service Pattern

### Client-Side Service

\`\`\`tsx
// lib/services/announcement-service.ts
import { supabase } from '@/lib/supabase/client-only'
import type { Announcement } from './announcement.types'

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching announcements:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getActiveAnnouncements:', error)
    return []
  }
}

// Other client-safe methods...
\`\`\`

### Server-Side Service

\`\`\`tsx
// lib/services/announcement-service.server.ts
'use server'

import { getServerSupabase } from '@/lib/supabase/server'
import type { Announcement } from './announcement.types'

export async function getActiveAnnouncementsServer(): Promise<Announcement[]> {
  try {
    const supabase = getServerSupabase()
    
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching announcements:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getActiveAnnouncementsServer:', error)
    return []
  }
}

// Other server-only methods...
\`\`\`

## Data Fetching Patterns

### In Server Components

\`\`\`tsx
// app/announcements/page.tsx
import { getActiveAnnouncementsServer } from '@/lib/services/announcement-service.server'
import { AnnouncementList } from './announcement-list'

export default async function AnnouncementsPage() {
  // Server-side data fetching
  const announcements = await getActiveAnnouncementsServer()
  
  return (
    <div>
      <h1>Announcements</h1>
      <AnnouncementList initialAnnouncements={announcements} />
    </div>
  )
}
\`\`\`

### In Client Components

\`\`\`tsx
// components/announcement-list.tsx
'use client'

import { useState, useEffect } from 'react'
import { getActiveAnnouncements } from '@/lib/services/announcement-service'
import type { Announcement } from '@/lib/services/announcement.types'

export function AnnouncementList({ 
  initialAnnouncements = [] 
}: { 
  initialAnnouncements?: Announcement[] 
}) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [loading, setLoading] = useState(false)
  
  // Client-side data fetching (for updates or refresh)
  const refreshAnnouncements = async () => {
    setLoading(true)
    try {
      const data = await getActiveAnnouncements()
      setAnnouncements(data)
    } catch (error) {
      console.error('Error refreshing announcements:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <button onClick={refreshAnnouncements} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
      
      {announcements.map(announcement => (
        <div key={announcement.id}>
          <h2>{announcement.title}</h2>
          <p>{announcement.content}</p>
        </div>
      ))}
    </div>
  )
}
\`\`\`

## Authentication Pattern

### Auth Context (Client-Only)

\`\`\`tsx
// lib/context/auth-context.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client-only'

// Auth context implementation...

export function AuthProvider({ children }) {
  // Auth state and methods...
  
  return (
    <AuthContext.Provider value={/* auth values */}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
\`\`\`

### Auth in Server Components

\`\`\`tsx
// app/profile/page.tsx
import { getServerSupabase } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = getServerSupabase()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // Fetch user profile with session
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()
  
  return (
    <div>
      <h1>Welcome, {profile.full_name}</h1>
      {/* Rest of profile page */}
    </div>
  )
}
\`\`\`

## Middleware Pattern

\`\`\`tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  // Create a request-specific Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      },
    }
  )
  
  // Auth and authorization logic...
  
  return NextResponse.next()
}
\`\`\`

## Common Pitfalls

1. **Importing Server Code in Client Components**
   - ❌ `import { getServerSupabase } from '@/lib/supabase/server'` in a client component
   - ✅ Use client-safe alternatives or pass data as props

2. **Using `next/headers` in Client Components**
   - ❌ `import { cookies } from 'next/headers'` in a client component
   - ✅ Use client-safe cookie alternatives like `js-cookie`

3. **Mixing Server Actions with Client Components**
   - ❌ Directly importing server actions in client components
   - ✅ Pass server actions as props or use form actions

4. **Environment Variables in Client Code**
   - ❌ Using server-only env vars in client code
   - ✅ Only use `NEXT_PUBLIC_` prefixed vars in client code

## Best Practices

1. **Type Safety**
   - Use TypeScript to prevent mixing server and client code
   - Create shared type definitions for data structures

2. **Error Handling**
   - Implement robust error handling in both environments
   - Provide fallbacks for failed data fetching

3. **Progressive Enhancement**
   - Start with server components for initial render
   - Enhance with client components for interactivity

4. **Code Splitting**
   - Keep client bundles small by moving logic to server components
   - Use dynamic imports for large client-side dependencies

5. **Testing**
   - Test server and client code separately
   - Use mocks for external dependencies
