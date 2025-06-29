-- Check if announcements table exists, if not create it
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If the table exists but has a status column instead of is_active, add is_active and migrate data
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'announcements' 
    AND column_name = 'status'
  ) AND NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'announcements' 
    AND column_name = 'is_active'
  ) THEN
    -- Add is_active column
    ALTER TABLE announcements ADD COLUMN is_active BOOLEAN DEFAULT true;
    
    -- Migrate data from status to is_active
    UPDATE announcements SET is_active = (status = 'active');
    
    -- Drop status column
    ALTER TABLE announcements DROP COLUMN status;
  END IF;
END
$$;
