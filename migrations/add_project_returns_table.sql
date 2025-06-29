-- Create project_returns table if it doesn't exist
CREATE TABLE IF NOT EXISTS project_returns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL,
    return_percentage DECIMAL(10, 2) NOT NULL,
    return_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some sample data if the table is empty
INSERT INTO project_returns (project_id, return_percentage, description)
SELECT 
    id, 
    (RANDOM() * 15 + 5)::DECIMAL(10, 2), -- Random return between 5% and 20%
    'Quarterly return for ' || name
FROM projects
WHERE EXISTS (SELECT 1 FROM projects LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM project_returns)
LIMIT 10;
