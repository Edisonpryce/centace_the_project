-- Create auth_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add is_active column to profiles if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Add last_login column to profiles if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Create media table if it doesn't exist
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  media_type VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  uploaded_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reports table if it doesn't exist
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reported_by UUID REFERENCES auth.users(id),
  content_type VARCHAR(50) NOT NULL,
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  resolved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(255) NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_logs (
  id SERIAL PRIMARY KEY,
  admin_id UUID REFERENCES auth.users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(50),
  entity_id TEXT,
  details JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to set the first user as super_admin
CREATE OR REPLACE FUNCTION set_first_user_as_super_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is the first user
  IF (SELECT COUNT(*) FROM auth.users) = 1 THEN
    -- Insert super_admin role for the first user
    INSERT INTO auth_roles (user_id, role)
    VALUES (NEW.id, 'super_admin');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to set the first user as super_admin
DROP TRIGGER IF EXISTS set_first_user_as_super_admin_trigger ON auth.users;
CREATE TRIGGER set_first_user_as_super_admin_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION set_first_user_as_super_admin();

-- Create RLS policies for auth_roles
ALTER TABLE auth_roles ENABLE ROW LEVEL SECURITY;

-- Only super_admins can manage roles
CREATE POLICY admin_roles_super_admin_policy ON auth_roles
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth_roles
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

-- Users can view their own role
CREATE POLICY view_own_role_policy ON auth_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());
