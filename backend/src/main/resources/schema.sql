-- =============================================================================
-- BetterIMDS Database Schema (PostgreSQL) - Squadron Scope
-- Designed for 35th Fighter Wing (Misawa Air Base) UTM Admin Portal
-- =============================================================================

-- 1. Drop existing tables in reverse dependency order
DROP TABLE IF EXISTS public.admin_unit_scope CASCADE;
DROP TABLE IF EXISTS public.admin_user CASCADE;
DROP TABLE IF EXISTS public.personnel_requirements_override CASCADE;
DROP TABLE IF EXISTS public.completion_tracker CASCADE;
DROP TABLE IF EXISTS public.unit_requirements CASCADE;
DROP TABLE IF EXISTS public.personnel CASCADE;
DROP TABLE IF EXISTS public.course_metadata CASCADE;
DROP TABLE IF EXISTS public.squadron CASCADE;
DROP TABLE IF EXISTS public.unit_org CASCADE;

-- 2. Foundational Tables

-- Squadrons (Primary Unit Scope)
CREATE TABLE public.squadron (
    squadron_id SERIAL PRIMARY KEY,
    squadron_name VARCHAR(100) UNIQUE NOT NULL
);

-- Course Catalog & Compliance Rules
CREATE TABLE public.course_metadata (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL, 
    course_title VARCHAR(150) NOT NULL,
    frequency_months INT NOT NULL,           
    grace_period_days INT DEFAULT 30         
);

-- 3. Personnel Roster
CREATE TABLE public.personnel (
    uid SERIAL PRIMARY KEY,
    edipi VARCHAR(10) UNIQUE NOT NULL,   
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    rank VARCHAR(10) NOT NULL,
    email VARCHAR(100),
    squadron_id INT REFERENCES public.squadron(squadron_id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Squadron Training Requirements
CREATE TABLE public.unit_requirements (
    requirement_id SERIAL PRIMARY KEY,
    squadron_id INT NOT NULL REFERENCES public.squadron(squadron_id) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES public.course_metadata(course_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_squadron_course UNIQUE (squadron_id, course_id)
);

-- 5. Completion Tracker (Historical Logs & Expirations)
CREATE TABLE public.completion_tracker (
    log_id SERIAL PRIMARY KEY,
    trainee_uid INT NOT NULL REFERENCES public.personnel(uid) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES public.course_metadata(course_id) ON DELETE CASCADE,
    completed_date DATE NOT NULL,
    expiration_date DATE,                
    signed_off_by_uid INT REFERENCES public.personnel(uid) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Personnel Requirements Override (Waivers / Exemptions)
CREATE TABLE public.personnel_requirements_override (
    override_id SERIAL PRIMARY KEY,
    trainee_uid INT NOT NULL REFERENCES public.personnel(uid) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES public.course_metadata(course_id) ON DELETE CASCADE,
    override_type VARCHAR(20) NOT NULL,   
    reason TEXT NOT NULL,                
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_person_course_override UNIQUE (trainee_uid, course_id)
);

-- 7. UTM Admin Users
CREATE TABLE public.admin_user (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'SQUADRON_UTM',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. UTM Admin Unit Scope (Multi-Squadron Management)
CREATE TABLE public.admin_unit_scope (
    scope_id SERIAL PRIMARY KEY,
    admin_id INT NOT NULL REFERENCES public.admin_user(admin_id) ON DELETE CASCADE,
    squadron_id INT NOT NULL REFERENCES public.squadron(squadron_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_admin_squadron_scope UNIQUE (admin_id, squadron_id)
);
