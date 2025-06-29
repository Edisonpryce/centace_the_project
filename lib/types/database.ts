export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  email: string | null
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  name: string
  category: string
  location: string | null
  status: string
  description: string | null
  maturity_period: string | null
  expected_returns: string | null
  risk_level: string | null
  price_per_share: number
  total_shares: number
  available_shares: number
  min_investment: number
  features: string[] | null
  timeline: ProjectTimeline[] | null
  farming_company: string | null
  funding_start_date: string | null
  funding_end_date: string | null
  image_url: string | null
  tier: string
  created_at: string
  updated_at: string
}

export type ProjectTimeline = {
  phase: string
  duration: string
  status: string
}

export type Investment = {
  id: string
  user_id: string
  project_id: string
  shares: number
  amount: number
  service_fee: number
  total_amount: number
  status: string
  created_at: string
  updated_at: string
}

export type ProjectUpdate = {
  id: string
  project_id: string
  title: string
  description: string | null
  type: string
  author: string | null
  author_avatar: string | null
  url: string | null
  likes: number
  comments: number
  created_at: string
}

export type Transaction = {
  id: string
  user_id: string
  type: string
  amount: number
  status: string
  payment_method: string | null
  reference: string | null
  created_at: string
}

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  is_read: boolean
  related_id: string | null
  created_at: string
}

export type Database = {}
