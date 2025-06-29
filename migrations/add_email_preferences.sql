-- Add email_preferences column to profiles table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'email_preferences'
    ) THEN
        ALTER TABLE profiles ADD COLUMN email_preferences JSONB DEFAULT '{
            "welcome": true,
            "investment": true,
            "update": true,
            "return": true,
            "transaction": true,
            "new": true,
            "marketing": false,
            "visit": true
        }'::JSONB;
    END IF;
END
$$;
