-- =============================================================================
-- BetterIMDS Database Schema (PostgreSQL)
-- File: backend/src/main/resources/schema.sql
-- Description: Core schema backup for BetterIMDS tables, relationships, and constraints.
-- =============================================================================

BEGIN;

-- 1. Wipe out any lingering partial schemas cleanly in public
DROP TABLE IF EXISTS public.personnel_requirements_override CASCADE;
DROP TABLE IF EXISTS public.completion_tracker CASCADE;
DROP TABLE IF EXISTS public.unit_requirements CASCADE;
DROP TABLE IF EXISTS public.course_metadata CASCADE;
DROP TABLE IF EXISTS public.personnel CASCADE;
DROP TABLE IF EXISTS public.unit_org CASCADE;

-- 2. Create foundational structures first (No dependencies)
-- Unit Hierarchy (Squadron -> Flight -> Shop)
CREATE TABLE public.unit_org (
    org_id SERIAL PRIMARY KEY,
    squadron VARCHAR(100) NOT NULL,      
    flight VARCHAR(50) NOT NULL,         
    shop_code VARCHAR(10) NOT NULL,      
    CONSTRAINT unique_shop UNIQUE (squadron, flight, shop_code)
);

-- Course Catalog & Compliance Rules
CREATE TABLE public.course_metadata (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL, 
    course_title VARCHAR(150) NOT NULL,
    frequency_months INT NOT NULL,           
    grace_period_days INT DEFAULT 30         
);

-- 3. Create the roster (Depends ONLY on unit_org)
CREATE TABLE public.personnel (
    uid SERIAL PRIMARY KEY,
    edipi VARCHAR(10) UNIQUE NOT NULL,   
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    rank VARCHAR(10) NOT NULL,
    email VARCHAR(100),
    org_id INT REFERENCES public.unit_org(org_id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create junction requirements (Depends on unit_org and course_metadata)
CREATE TABLE public.unit_requirements (
    requirement_id SERIAL PRIMARY KEY,
    org_id INT REFERENCES public.unit_org(org_id) ON DELETE CASCADE,
    course_id INT REFERENCES public.course_metadata(course_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_unit_course UNIQUE (org_id, course_id)
);

-- 5. Create tracker (Depends on personnel and course_metadata)
CREATE TABLE public.completion_tracker (
    log_id SERIAL PRIMARY KEY,
    trainee_uid INT REFERENCES public.personnel(uid) ON DELETE CASCADE,
    course_id INT REFERENCES public.course_metadata(course_id) ON DELETE CASCADE,
    completed_date DATE NOT NULL,
    expiration_date DATE NOT NULL,           
    signed_off_by_uid INT REFERENCES public.personnel(uid) ON DELETE SET NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create overrides/waivers (Depends on personnel and course_metadata)
CREATE TABLE public.personnel_requirements_override (
    override_id SERIAL PRIMARY KEY,
    trainee_uid INT REFERENCES public.personnel(uid) ON DELETE CASCADE,
    course_id INT REFERENCES public.course_metadata(course_id) ON DELETE CASCADE,
    override_type VARCHAR(20) NOT NULL,      
    reason TEXT NOT NULL,                    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_person_course_override UNIQUE (trainee_uid, course_id)
);

COMMIT;
