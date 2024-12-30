/*
  # Create Security Events Table

  1. New Tables
    - `security_events`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with time zone)
      - `event_type` (text)
      - `severity` (enum: low, medium, high, critical)
      - `source_ip` (text)
      - `description` (text)
      - `raw_data` (jsonb)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create enum type for severity levels
CREATE TYPE security_event_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create security events table
CREATE TABLE IF NOT EXISTS security_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  event_type text NOT NULL,
  severity security_event_severity NOT NULL,
  source_ip text NOT NULL,
  description text NOT NULL,
  raw_data jsonb DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read all events
CREATE POLICY "Allow authenticated users to read security events"
  ON security_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to insert events
CREATE POLICY "Allow authenticated users to insert security events"
  ON security_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
