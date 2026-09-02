-- =============================================================================
-- BetterIMDS Test Seed Data: 35th Fighter Wing (Misawa Air Base, Japan - PACAF)
-- Universal Annual Mandatory Air Force / DoD Ancillary Training CBTs
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 1. Squadrons (35 FW Units)
-- -----------------------------------------------------------------------------
INSERT INTO public.squadron (squadron_id, squadron_name) VALUES
(1, '35 MXS'),   -- 35th Maintenance Squadron
(2, '35 AMXS'),  -- 35th Aircraft Maintenance Squadron
(3, '35 CES'),   -- 35th Civil Engineer Squadron
(4, '35 FSS'),   -- 35th Force Support Squadron
(5, '35 MXG'),   -- 35th Maintenance Group Staff
(6, '35 FW')     -- 35th Fighter Wing Staff
ON CONFLICT (squadron_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 2. Course Metadata (Mandatory Air Force & DoD Annual CBT Catalog)
-- -----------------------------------------------------------------------------
INSERT INTO public.course_metadata (course_id, course_code, course_title, description, frequency_months, grace_period_days) VALUES
(1,  'CYBER-AWARE',  'DoD Cyber Awareness Challenge',             'Mandatory annual cybersecurity awareness, phishing defense, and NIPR/SIPR information security practices.', 12, 30),
(2,  'OPSEC-FUND',   'Operations Security (OPSEC) Fundamentals',  'Critical information protection, social media vulnerability, and safeguarding PACAF mission profiles.',      12, 30),
(3,  'SAPR-ANNUAL',  'Sexual Assault Prevention & Response',      'Annual Bystander intervention, reporting mechanisms, and military victim advocate resources.',              12, 30),
(4,  'SUICIDE-PREV', 'Suicide Prevention & Resilience Training',  'ACE (Ask, Care, Escort) model training, mental wellness, and warrior resilience strategies.',                12, 30),
(5,  'CBRN-DEFENSE', 'CBRN Defense & Chemical Warfare Awareness', 'Individual protective equipment (MOPP levels), mask fit procedures, and contamination avoidance.',        12, 30),
(6,  'FORCE-PROT-1', 'Antiterrorism / Force Protection Level 1',  'Individual awareness of terrorist threats, active shooter response, and overseas security posture.',        12, 30),
(7,  'LOAC-GENEVA',  'Law of Armed Conflict (LOAC) & Geneva Conv','Principles of military necessity, distinction, proportionality, and Geneva Convention protocols.',           12, 30),
(8,  'TCCC-TRAUMA',  'Tactical Combat Casualty Care (TCCC / SABC)','Tourniquet application, airway management, and combat casualty triage fundamentals.',                       12, 30),
(9,  'CUI-PRIVACY',  'Controlled Unclassified Info (CUI) & Privacy','Handling CUI marking standards, Freedom of Information Act (FOIA), and PII safeguarding regulations.',       12, 30),
(10, 'NO-FEAR-ACT',  'Equal Opportunity & No FEAR Act Training',  'Workplace harassment prevention, whistleblower protections, and anti-discrimination policies.',             24, 60)
ON CONFLICT (course_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 3. Personnel Roster
-- -----------------------------------------------------------------------------
INSERT INTO public.personnel (uid, edipi, first_name, last_name, rank, email, squadron_id, is_active) VALUES
-- 35 MXS (Squadron 1)
(1,  '1035000001', 'Marcus',    'Vance',      'MSgt',  'marcus.vance@test.com',    1, true),
(2,  '1035000002', 'Elena',     'Reyes',      'TSgt',  'elena.reyes@test.com',     1, true),
(3,  '1035000003', 'Jackson',   'Lee',        'SSgt',  'jackson.lee@test.com',     1, true),
(4,  '1035000004', 'Tyler',     'Brooks',     'SSgt',  'tyler.brooks@test.com',    1, true),
(5,  '1035000005', 'Chloe',     'Bennett',    'SrA',   'chloe.bennett@test.com',   1, true),
(6,  '1035000006', 'Darius',    'Washington', 'SrA',   'darius.w@test.com',        1, true),
(7,  '1035000007', 'Liam',      'OConnor',    'A1C',   'liam.oconnor@test.com',    1, true),
(8,  '1035000008', 'Sophia',    'Chen',       'A1C',   'sophia.chen@test.com',     1, true),

-- 35 AMXS (Squadron 2)
(9,  '1035000009', 'Nathan',    'Drake',      'TSgt',  'nathan.drake@test.com',    2, true),
(10, '1035000010', 'Maya',      'Lin',        'SSgt',  'maya.lin@test.com',        2, true),
(11, '1035000011', 'Lucas',     'Gomez',      'SrA',   'lucas.gomez@test.com',     2, true),
(12, '1035000012', 'Aiden',     'Kowalski',   'A1C',   'aiden.kowalski@test.com',  2, true),

-- 35 CES (Squadron 3)
(13, '1035000013', 'Victor',    'Steele',     'MSgt',  'victor.steele@test.com',   3, true),
(14, '1035000014', 'Hannah',    'Abbott',     'SSgt',  'hannah.abbott@test.com',   3, true),

-- 35 FSS (Squadron 4)
(15, '1035000015', 'Rachel',    'Adams',      'TSgt',  'rachel.adams@test.com',    4, true),

-- 35 MXG Staff (Squadron 5)
(16, '1035000016', 'Kenji',     'Takahashi',  'SMSgt', 'kenji.takahashi@test.com', 5, true),
(17, '1035000017', 'Samantha',  'Hayes',      'TSgt',  'samantha.hayes@test.com',  5, true),

-- 35 FW Staff (Squadron 6)
(18, '1035000018', 'Alexander', 'Cross',      'Col',   'alexander.cross@test.com', 6, true)
ON CONFLICT (uid) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 4. Squadron Training Requirements (Mandatory CBTs assigned to all squadrons)
-- -----------------------------------------------------------------------------
INSERT INTO public.unit_requirements (requirement_id, squadron_id, course_id) VALUES
-- 35 MXS Annual CBTs
(1,  1, 1),   -- CYBER-AWARE
(2,  1, 2),   -- OPSEC-FUND
(3,  1, 3),   -- SAPR-ANNUAL
(4,  1, 4),   -- SUICIDE-PREV
(5,  1, 5),   -- CBRN-DEFENSE
(6,  1, 6),   -- FORCE-PROT-1
(7,  1, 7),   -- LOAC-GENEVA
(8,  1, 8),   -- TCCC-TRAUMA

-- 35 AMXS Annual CBTs
(9,  2, 1),   -- CYBER-AWARE
(10, 2, 2),   -- OPSEC-FUND
(11, 2, 3),   -- SAPR-ANNUAL
(12, 2, 4),   -- SUICIDE-PREV
(13, 2, 5),   -- CBRN-DEFENSE
(14, 2, 6),   -- FORCE-PROT-1
(15, 2, 7),   -- LOAC-GENEVA
(16, 2, 8),   -- TCCC-TRAUMA

-- 35 CES Annual CBTs
(17, 3, 1),
(18, 3, 2),
(19, 3, 3),
(20, 3, 4),
(21, 3, 6),
(22, 3, 8),

-- 35 FSS Annual CBTs
(23, 4, 1),
(24, 4, 2),
(25, 4, 3),
(26, 4, 4),
(27, 4, 6),
(28, 4, 9)
ON CONFLICT (squadron_id, course_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 5. Completion Tracker (Historical CBT Logs & Expirations)
-- -----------------------------------------------------------------------------
INSERT INTO public.completion_tracker (log_id, trainee_uid, course_id, completed_date, expiration_date, signed_off_by_uid) VALUES
-- Marcus Vance (MSgt - 35 MXS) - 100% Green
(1,  1,  1, '2025-10-15', '2026-10-15', 16),
(2,  1,  2, '2025-10-15', '2026-10-15', 16),
(3,  1,  3, '2025-11-20', '2026-11-20', 16),
(4,  1,  4, '2025-11-20', '2026-11-20', 16),
(5,  1,  5, '2025-09-10', '2026-09-10', 16),
(6,  1,  6, '2025-09-10', '2026-09-10', 16),

-- Elena Reyes (TSgt - 35 MXS) - 100% Green
(7,  2,  1, '2025-08-14', '2026-08-14', 1),
(8,  2,  2, '2025-08-14', '2026-08-14', 1),
(9,  2,  3, '2025-10-01', '2026-10-01', 1),
(10, 2,  4, '2025-10-01', '2026-10-01', 1),
(11, 2,  5, '2025-10-05', '2026-10-05', 1),
(12, 2,  6, '2025-10-05', '2026-10-05', 1),

-- Jackson Lee (SSgt - 35 MXS) - Expiring Soon (Yellow)
(13, 3,  1, '2025-09-15', '2026-09-15', 2),
(14, 3,  2, '2025-09-15', '2026-09-15', 2),
(15, 3,  3, '2025-07-20', '2026-07-20', 2),
(16, 3,  4, '2025-07-20', '2026-07-20', 2),

-- Tyler Brooks (SSgt - 35 MXS) - Overdue (Red)
(17, 4,  1, '2024-06-10', '2025-06-10', 2), -- Expired Red!
(18, 4,  2, '2024-06-10', '2025-06-10', 2), -- Expired Red!
(19, 4,  3, '2025-09-25', '2026-09-25', 2),
(20, 4,  4, '2025-09-25', '2026-09-25', 2),

-- Chloe Bennett (SrA - 35 MXS)
(21, 5,  1, '2025-12-05', '2026-12-05', 3),
(22, 5,  2, '2025-12-05', '2026-12-05', 3),
(23, 5,  3, '2025-10-12', '2026-10-12', 3),

-- Darius Washington (SrA - 35 MXS)
(24, 6,  1, '2025-08-10', '2026-08-10', 4),
(25, 6,  2, '2025-08-10', '2026-08-10', 4),

-- Nathan Drake (TSgt - 35 AMXS)
(26, 9,  1, '2025-10-10', '2026-10-10', 16),
(27, 9,  2, '2025-10-10', '2026-10-10', 16),
(28, 9,  3, '2025-11-05', '2026-11-05', 16),
(29, 9,  4, '2025-11-05', '2026-11-05', 16),
(30, 9,  6, '2025-09-15', '2026-09-15', 16)
ON CONFLICT (log_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 6. Personnel Requirements Override (Waivers / Exemptions)
-- -----------------------------------------------------------------------------
INSERT INTO public.personnel_requirements_override (override_id, trainee_uid, course_id, override_type, reason) VALUES
-- Chloe Bennett (SrA - 35 MXS) has medical profile waiver for CBRN
(1, 5, 5, 'WAIVER',    'Medical profile - respiratory mask fit waiver through Q4'),
-- Darius Washington (SrA - 35 MXS) has temporary deployment exemption
(2, 6, 8, 'EXEMPTION', 'TDY to Kadena AB supporting Cope North exercise')
ON CONFLICT (trainee_uid, course_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 7. UTM Admin Users
-- -----------------------------------------------------------------------------
INSERT INTO public.admin_user (admin_id, username, email, full_name, role, is_active) VALUES
(1, 'utm_mxs',  'elena.reyes@test.com',     'TSgt Elena Reyes',     'SQUADRON_UTM', true),
(2, 'utm_amxs', 'nathan.drake@test.com',    'TSgt Nathan Drake',    'SQUADRON_UTM', true),
(3, 'utm_wing', 'samantha.hayes@test.com', 'TSgt Samantha Hayes',  'WING_UTM',     true)
ON CONFLICT (admin_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 8. UTM Admin Unit Scope (Squadron Access Matrix)
-- -----------------------------------------------------------------------------
INSERT INTO public.admin_unit_scope (scope_id, admin_id, squadron_id) VALUES
-- TSgt Elena Reyes manages 35 MXS
(1, 1, 1),
-- TSgt Nathan Drake manages 35 AMXS
(2, 2, 2),
-- TSgt Samantha Hayes (Wing UTM) manages all squadrons
(3, 3, 1),
(4, 3, 2),
(5, 3, 3),
(6, 3, 4),
(7, 3, 5),
(8, 3, 6)
ON CONFLICT (admin_id, squadron_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- Sequence Reset
-- -----------------------------------------------------------------------------
SELECT setval('public.squadron_squadron_id_seq', (SELECT MAX(squadron_id) FROM public.squadron));
SELECT setval('public.course_metadata_course_id_seq', (SELECT MAX(course_id) FROM public.course_metadata));
SELECT setval('public.personnel_uid_seq', (SELECT MAX(uid) FROM public.personnel));
SELECT setval('public.unit_requirements_requirement_id_seq', (SELECT MAX(requirement_id) FROM public.unit_requirements));
SELECT setval('public.completion_tracker_log_id_seq', (SELECT MAX(log_id) FROM public.completion_tracker));
SELECT setval('public.personnel_requirements_override_override_id_seq', (SELECT MAX(override_id) FROM public.personnel_requirements_override));
SELECT setval('public.admin_user_admin_id_seq', (SELECT MAX(admin_id) FROM public.admin_user));
SELECT setval('public.admin_unit_scope_scope_id_seq', (SELECT MAX(scope_id) FROM public.admin_unit_scope));

COMMIT;
