-- Create error_logs table for storing application errors
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  stack TEXT,
  url TEXT,
  user_id UUID REFERENCES auth.users(id),
  browser_info JSONB,
  app_version VARCHAR(50),
  timestamp TIMESTAMPTZ NOT NULL,
  severity VARCHAR(20) DEFAULT 'error',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS error_logs_timestamp_idx ON error_logs(timestamp);
CREATE INDEX IF NOT EXISTS error_logs_user_id_idx ON error_logs(user_id);
CREATE INDEX IF NOT EXISTS error_logs_severity_idx ON error_logs(severity);

-- Add RLS policies
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view error logs
CREATE POLICY "Admins can view error logs"
  ON error_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth_roles
      WHERE auth_roles.user_id = auth.uid()
      AND auth_roles.role IN ('admin', 'super_admin')
    )
  );

-- System can insert error logs
CREATE POLICY "System can insert error logs"
  ON error_logs FOR INSERT
  WITH CHECK (true);
