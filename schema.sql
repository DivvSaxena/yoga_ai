-- YogaAI Database Schema
-- Database: Supabase (PostgreSQL)
-- Last Updated: 2024

-- ============================================
-- TABLE 1: yoga_users (User Plan Submissions)
-- ============================================
-- Stores user data when they generate a fitness plan

CREATE TABLE IF NOT EXISTS yoga_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- User Profile
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  weight DECIMAL,
  height DECIMAL,
  bmi DECIMAL,

  -- Fitness Preferences
  goal TEXT,                    -- weight-loss, muscle-gain, maintenance
  activity_level TEXT,          -- sedentary, moderate, active
  diet_preference TEXT,         -- vegetarian, non-vegetarian, eggetarian
  medical_conditions TEXT,
  equipment TEXT,

  -- Generated Plan Summary
  plan_calories INTEGER,
  plan_workout_days INTEGER
);

-- Enable Row Level Security
ALTER TABLE yoga_users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations (for demo purposes)
CREATE POLICY "Allow all operations on yoga_users" ON yoga_users
  FOR ALL USING (true) WITH CHECK (true);


-- ============================================
-- TABLE 2: feedback (User Feedback & Research)
-- ============================================
-- Collects feedback from users for research purposes

CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact Info (optional)
  name TEXT,
  email TEXT,
  phone TEXT,

  -- Demographics
  age_group TEXT,               -- 18-24, 25-34, 35-44, 45+
  city TEXT,
  occupation TEXT,

  -- Fitness Background
  current_fitness_level TEXT,   -- beginner, intermediate, advanced
  fitness_goals TEXT[],         -- array: weight-loss, muscle-gain, flexibility, etc.
  diet_type TEXT,               -- vegetarian, non-vegetarian, vegan, eggetarian

  -- App Feedback
  how_did_you_hear TEXT,        -- social-media, friend, search, other
  rating INTEGER,               -- 1-5 stars
  liked_features TEXT,
  improvements TEXT,
  would_recommend BOOLEAN,

  -- Research Consent
  consent_to_research BOOLEAN DEFAULT false,
  consent_to_contact BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations (for demo purposes)
CREATE POLICY "Allow all operations on feedback" ON feedback
  FOR ALL USING (true) WITH CHECK (true);


-- ============================================
-- INDEXES (for performance)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_yoga_users_created_at ON yoga_users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_yoga_users_goal ON yoga_users(goal);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);


-- ============================================
-- SAMPLE QUERIES
-- ============================================

-- Get user statistics
-- SELECT
--   COUNT(*) as total_users,
--   AVG(age) as avg_age,
--   AVG(bmi) as avg_bmi,
--   goal,
--   COUNT(*) as count_per_goal
-- FROM yoga_users
-- GROUP BY goal;

-- Get feedback summary
-- SELECT
--   AVG(rating) as avg_rating,
--   COUNT(*) as total_feedback,
--   SUM(CASE WHEN would_recommend THEN 1 ELSE 0 END) as would_recommend_count
-- FROM feedback;
