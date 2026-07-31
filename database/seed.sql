-- ==========================================================
-- CampusOS v1.0 — Initial Seed Data
-- ==========================================================

-- Demo User Profile
INSERT INTO public.profiles (id, email, full_name, university, major, semester, current_gpa, target_gpa)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'alex.morgan@university.edu',
    'Alex Morgan',
    'Stanford University',
    'Computer Science & AI',
    5,
    3.85,
    4.00
) ON CONFLICT (id) DO NOTHING;

-- Demo Subjects
INSERT INTO public.subjects (id, user_id, name, code, professor, credits, color, room)
VALUES 
(
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Distributed Systems',
    'CS301',
    'Dr. Aris Thorne',
    4,
    '#7C5CFC',
    'Hall B'
),
(
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Machine Learning Theory',
    'AI402',
    'Prof. Elena Rostova',
    4,
    '#22C55E',
    'Lab 402'
) ON CONFLICT (id) DO NOTHING;
