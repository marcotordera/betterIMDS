-- =============================================================================
-- BetterIMDS Test Seed Data: 35th Fighter Wing (Misawa Air Base, Japan - PACAF)
-- "Home of the Wild Weasels" (F-16CM / PACAF Operations)
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 1. Unit Organizations (35 FW, 35 MXG, 35 MXS, 35 AMXS, 35 CES, 35 FSS)
-- -----------------------------------------------------------------------------
INSERT INTO public.unit_org (org_id, squadron, flight, shop_code) VALUES
-- 35 FW Staff
(1, '35 FW', 'Wing Safety', 'SE'),
(2, '35 FW', 'Command Post', 'CP'),

-- 35 MXG (Group Staff & Central Sections)
(3, '35 MXG', 'Quality Assurance', 'QA'),
(4, '35 MXG', 'Maintenance Training', 'MTS'),
(5, '35 MXG', 'Plans, Scheduling & Doc', 'PS&D'),

-- 35 MXS (Maintenance Squadron - Backshops)
(6, '35 MXS', 'Propulsion Flight', 'JEIM'),
(7, '35 MXS', 'Accessories Flight', 'ELECT'),
(8, '35 MXS', 'Fabrication Flight', 'STRUCT'),
(9, '35 MXS', 'Armament Flight', 'GUNS'),

-- 35 AMXS (Aircraft Maintenance Squadron - Flightline AMUs)
(10, '35 AMXS', '13th AMU (Panthers)', 'CREW13'),
(11, '35 AMXS', '14th AMU (Samurais)', 'CREW14'),
(12, '35 AMXS', 'Specialist Flight', 'SPEC'),

-- 35 CES (Civil Engineer Squadron)
(13, '35 CES', 'Fire Emergency Services', 'FIRE'),
(14, '35 CES', 'Explosive Ordnance Disposal', 'EOD'),
(15, '35 CES', 'Operations Flight', 'CEO'),

-- 35 FSS (Force Support Squadron)
(16, '35 FSS', 'Military Personnel Flight', 'MPF'),
(17, '35 FSS', 'Force Development', 'FSD')
ON CONFLICT (squadron, flight, shop_code) DO NOTHING;


-- -----------------------------------------------------------------------------
-- 2. Course Metadata (PACAF, F-16 Wild Weasel, Base & Shop Requirements)
-- -----------------------------------------------------------------------------
INSERT INTO public.course_metadata (course_id, course_code, course_title, frequency_months, grace_period_days) VALUES
-- Universal / Flightline / PACAF Courses
(1,  'PACAF-FL-01',   'Misawa Flightline Driving (Winter/Snow Ops)',  24, 30),
(2,  'CBRN-MOPP-02',  'PACAF High-Threat CBRN Defense Refresher',      18, 60),
(3,  'CPR-FA-03',     'CPR / Automated External Defibrillator (AED)', 24, 30),
(4,  'OPSEC-CYBER-04','DoD Cyber Awareness & OPSEC Annual',          12, 15),

-- Maintenance & F-16 Specific Courses
(5,  'F16-ENG-RUN',   'F-16 F110-GE-129 Engine Run Certification',     12, 30),
(6,  'F16-EGRESS-01', 'F-16 ACES II Egress & Canopy Safety Checkout', 12, 30),
(7,  'F16-WEAP-LOAD', 'AGM-88 HARM / JDAM Weapons Loading Cert',      6,  15),
(8,  'MXG-QA-INSP',   '35 MXG Quality Assurance Inspector Qual',      12, 30),

-- Civil Engineer / Fire Courses
(9,  'CE-FIRE-HAZ',   'Hydrazine (H-70) Emergency Response Cert',     12, 30),
(10, 'EOD-MUN-REC',   'EOD Advanced Munitions Clearance Qual',        12, 30)
ON CONFLICT (course_code) DO NOTHING;


-- -----------------------------------------------------------------------------
-- 3. Personnel Roster (Wild Weasel Personnel across Misawa units)
-- -----------------------------------------------------------------------------
INSERT INTO public.personnel (uid, edipi, first_name, last_name, rank, email, org_id, is_active) VALUES
-- 35 MXG QA
(1,  '1035000001', 'James',     'Hawkins',   'MSgt', 'james.hawkins@test.com',   3,  TRUE),
(2,  '1035000002', 'Elena',     'Rostova',   'TSgt', 'elena.rostova@test.com',   3,  TRUE),

-- 35 MXS Propulsion (JEIM)
(3,  '1035000003', 'Kenji',     'Tanaka',    'TSgt', 'kenji.tanaka@test.com',    6,  TRUE),
(4,  '1035000004', 'Tyler',     'Brooks',    'SSgt', 'tyler.brooks@test.com',    6,  TRUE),
(5,  '1035000005', 'Ashley',    'Morgan',    'SrA',  'ashley.morgan@test.com',   6,  TRUE),

-- 35 AMXS 14th AMU (Samurais)
(6,  '1035000006', 'Brandon',   'Cole',      'MSgt', 'brandon.cole@test.com',    11, TRUE),
(7,  '1035000007', 'David',     'Kim',       'SSgt', 'david.kim@test.com',       11, TRUE),
(8,  '1035000008', 'Samantha',  'Hayes',     'A1C',  'samantha.hayes@test.com',  11, TRUE),

-- 35 CES Fire & EOD
(9,  '1035000009', 'Marcus',    'Sterling',  'TSgt', 'marcus.sterling@test.com', 13, TRUE),
(10, '1035000010', 'Daniel',    'Vance',     'SSgt', 'daniel.vance@test.com',    14, TRUE),

-- 35 FW Safety Staff
(11, '1035000011', 'Rachel',    'Adams',     'Capt', 'rachel.adams@test.com',    1,  TRUE)
ON CONFLICT (edipi) DO NOTHING;


-- -----------------------------------------------------------------------------
-- 4. Unit Requirements (Mandatory courses by Misawa shop)
-- -----------------------------------------------------------------------------
INSERT INTO public.unit_requirements (org_id, course_id) VALUES
-- 35 MXS Propulsion (JEIM): Flightline Driving, Engine Run, Egress, CPR
(6, 1),
(6, 3),
(6, 5),
(6, 6),

-- 35 AMXS 14th AMU: Flightline Driving, Egress, Weapons Load, CBRN
(11, 1),
(11, 2),
(11, 6),
(11, 7),

-- 35 MXG QA: Flightline Driving, QA Inspector, Egress, Engine Run
(3, 1),
(3, 5),
(3, 6),
(3, 8),

-- 35 CES Fire: Hydrazine Response, CPR, Flightline Driving
(13, 1),
(13, 3),
(13, 9),

-- 35 FW Safety: Cyber, Flightline Driving
(1, 1),
(1, 4)
ON CONFLICT (org_id, course_id) DO NOTHING;


-- -----------------------------------------------------------------------------
-- 5. Completion Tracker (Active, Expiring, and Overdue Training Logs)
-- -----------------------------------------------------------------------------
INSERT INTO public.completion_tracker (trainee_uid, course_id, completed_date, expiration_date, signed_off_by_uid) VALUES
-- Tyler Brooks (SSgt - 35 MXS JEIM): Fully Current on Engine Run and Driving
(4, 5, '2025-11-10', '2026-11-10', 3),  -- Engine Run signed by TSgt Tanaka
(4, 1, '2024-10-01', '2026-10-01', 1),  -- Flightline Driving signed by MSgt Hawkins
(4, 6, '2025-09-15', '2026-09-15', 3),  -- Egress Safety

-- Ashley Morgan (SrA - 35 MXS JEIM): Driving is CURRENT, Engine Run EXPIRED (Overdue test case)
(5, 1, '2025-05-20', '2027-05-20', 4),  -- Flightline Driving signed by SSgt Brooks
(5, 5, '2024-04-10', '2025-04-10', 3),  -- F-16 Engine Run: EXPIRED (Needs recert)

-- David Kim (SSgt - 35 AMXS 14th AMU): Current on HARM Weapons Loading & Egress
(7, 7, '2026-03-01', '2026-09-01', 6),  -- 6-Month HARM load cert signed by MSgt Cole
(7, 6, '2025-12-01', '2026-12-01', 6),  -- Egress Safety
(7, 1, '2024-06-01', '2026-06-01', 1),  -- Flightline Driving (Due Soon)

-- Marcus Sterling (TSgt - 35 CES Fire): Hydrazine Emergency Response
(9, 9, '2025-08-15', '2026-08-15', 11), -- Signed by Capt Adams (Safety)
(9, 3, '2025-02-10', '2027-02-10', 11)  -- CPR / AED
ON CONFLICT DO NOTHING;


-- -----------------------------------------------------------------------------
-- 6. Personnel Overrides / Waivers
-- -----------------------------------------------------------------------------
INSERT INTO public.personnel_requirements_override (trainee_uid, course_id, override_type, reason) VALUES
-- Ashley Morgan has a temporary profile waiver for Egress test until physical therapy complete
(5, 6, 'WAIVER', 'Temporary medical profile waiver approved by 35 MDG and 35 MXG/CC (Exp Oct 2026)')
ON CONFLICT (trainee_uid, course_id) DO NOTHING;


-- -----------------------------------------------------------------------------
-- 7. Admin / UTM Accounts
-- -----------------------------------------------------------------------------
INSERT INTO public.admin_user (admin_id, username, email, full_name, role, is_active) VALUES
-- MSgt Hawkins: 35 MXG Group UTM (Manages MXG, MXS, AMXS)
(1, 'msgt.hawkins', 'james.hawkins@test.com', 'MSgt James Hawkins', 'GROUP_UTM', TRUE),

-- Capt Adams: 35 FW Wing Training Officer (Manages all units across base)
(2, 'capt.adams', 'rachel.adams@test.com', 'Capt Rachel Adams', 'WING_UTM', TRUE),

-- TSgt Tanaka: 35 MXS Squadron UTM
(3, 'tsgt.tanaka', 'kenji.tanaka@test.com', 'TSgt Kenji Tanaka', 'SQUADRON_UTM', TRUE)
ON CONFLICT (username) DO NOTHING;


-- -----------------------------------------------------------------------------
-- 8. Admin Unit Scope (Units each UTM is authorized to manage)
-- -----------------------------------------------------------------------------
INSERT INTO public.admin_unit_scope (admin_id, org_id) VALUES
-- MSgt Hawkins (Group UTM) has scope over 35 MXG, 35 MXS, and 35 AMXS shops (org_ids: 3-12)
(1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12),

-- TSgt Tanaka (Squadron UTM) has scope over 35 MXS backshops (org_ids: 6-9)
(3, 6), (3, 7), (3, 8), (3, 9)
ON CONFLICT (admin_id, org_id) DO NOTHING;


-- -----------------------------------------------------------------------------
-- 9. Reset Sequence Counters (Prevents ID collisions on new inserts)
-- -----------------------------------------------------------------------------
SELECT setval('public.unit_org_org_id_seq', COALESCE((SELECT MAX(org_id) FROM public.unit_org), 1));
SELECT setval('public.course_metadata_course_id_seq', COALESCE((SELECT MAX(course_id) FROM public.course_metadata), 1));
SELECT setval('public.personnel_uid_seq', COALESCE((SELECT MAX(uid) FROM public.personnel), 1));
SELECT setval('public.admin_user_admin_id_seq', COALESCE((SELECT MAX(admin_id) FROM public.admin_user), 1));
SELECT setval('public.admin_unit_scope_scope_id_seq', COALESCE((SELECT MAX(scope_id) FROM public.admin_unit_scope), 1));

COMMIT;
