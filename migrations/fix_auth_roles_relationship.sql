-- Check if auth_roles table exists, if not create it
CREATE TABLE IF NOT EXISTS auth_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add foreign key from profiles to auth_roles if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'id'
  ) THEN
    -- Add id column to profiles if it doesn't exist
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS id UUID PRIMARY KEY DEFAULT auth.uid();
  END IF;
END
$$;

-- Make sure profiles has the correct primary key
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_pkey;
ALTER TABLE profiles ADD PRIMARY KEY (id);

-- Create a view to join profiles and auth_roles
CREATE OR REPLACE VIEW profiles_with_roles AS
SELECT 
  p.*,
  ar.role
FROM 
  profiles p
LEFT JOIN 
  auth_roles ar ON p.id = ar.user_id;

-- Grant permissions on the view
GRANT SELECT ON profiles_with_roles TO authenticated;
GRANT SELECT ON profiles_with_roles TO anon;
