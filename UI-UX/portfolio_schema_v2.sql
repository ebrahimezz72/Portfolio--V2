-- ============================================================
-- PORTFOLIO DATABASE — v2 (Full Stack Dev + Graphic Designer)
-- Ibrahim Ezzeldin
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. PROFILE
--    صف واحد بس — بياناتك الشخصية
-- ============================================================
create table profile (
  id                   uuid primary key default uuid_generate_v4(),
  name                 text not null default 'Ibrahim Ezzeldin',
  title                text not null default 'Full Stack Developer & Graphic Designer',
  tagline              text default 'The Digital Artisan',
  bio                  text,
  philosophy           text,
  location             text default 'Cairo, Egypt',
  email                text,
  phone                text,
  availability_status  text default 'OPEN',        -- OPEN | BUSY | UNAVAILABLE
  open_to_freelance    boolean default true,
  open_to_fulltime     boolean default true,
  github_url           text,
  linkedin_url         text,
  behance_url          text,                        -- مهم لـ Graphic Designer
  dribbble_url         text,                        -- مهم لـ Graphic Designer
  cv_url               text,
  years_of_experience  int default 0,
  updated_at           timestamptz default now()
);

-- ============================================================
-- 2. PROJECTS
--    كل المشاريع — dev و design على حد سوا
-- ============================================================
create table projects (
  id               uuid primary key default uuid_generate_v4(),
  title            text not null,
  slug             text unique not null,
  description      text,
  type             text not null default 'dev',     -- dev | design | fullstack
  tech_stack       text[] default '{}',             -- للـ dev projects
  design_tools     text[] default '{}',             -- للـ design projects: ['Figma', 'Illustrator']
  thumbnail_url    text,
  images           text[] default '{}',             -- gallery للـ design projects
  repo_url         text,                            -- GitHub link
  live_demo_url    text,                            -- رابط شغال
  case_study_url   text,                            -- "View Case Study →"
  behance_url      text,                            -- لو المشروع على Behance
  is_featured      boolean default false,
  display_order    int default 0,
  created_at       timestamptz default now()
);

-- ============================================================
-- 3. SKILL_CATEGORIES
--    مجموعات الـ Skills
-- ============================================================
create table skill_categories (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  description   text,
  icon          text,
  type          text default 'dev',                 -- dev | design | both
  display_order int default 0
);

-- ============================================================
-- 4. SKILLS
--    كل chip جوه category
-- ============================================================
create table skills (
  id            uuid primary key default uuid_generate_v4(),
  category_id   uuid references skill_categories(id) on delete cascade,
  name          text not null,
  display_order int default 0
);

-- ============================================================
-- 5. CERTIFICATES
--    شهاداتك من Coursera / Udemy / إلخ
-- ============================================================
create table certificates (
  id             uuid primary key default uuid_generate_v4(),
  title          text not null,
  issuer         text,
  credential_url text,
  icon_type      text default 'badge',              -- badge | person | lightning | design
  issued_year    int,
  display_order  int default 0
);

-- ============================================================
-- 6. EXPERIENCE
--    وظايفك بالتفاصيل
-- ============================================================
create table experience (
  id               uuid primary key default uuid_generate_v4(),
  role             text not null,
  company          text not null,
  employment_type  text default 'FULL-TIME',        -- FULL-TIME | PART-TIME | FREELANCE | CONTRACT
  location_type    text default 'REMOTE',           -- REMOTE | HYBRID | ONSITE
  city             text,
  period_start     text not null,
  period_end       text default 'PRESENT',
  responsibilities text[] default '{}',
  technologies     text[] default '{}',
  key_achievement  text,
  display_order    int default 0
);

-- ============================================================
-- 7. MILESTONES
--    التايملاين — Growth Milestones
-- ============================================================
create table milestones (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  period        text,
  description   text,
  display_order int default 0
);

-- ============================================================
-- 8. SERVICES
--    الخدمات اللي بتقدمها للـ clients — مهم جداً للـ freelance
-- ============================================================
create table services (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,                      -- "UI/UX Design" / "Web Development"
  description   text,
  icon          text,
  type          text default 'dev',                 -- dev | design | both
  features      text[] default '{}',               -- ['Responsive', 'SEO Optimized', ...]
  starting_price text,                              -- "Starting at $500" — اختياري
  display_order int default 0
);

-- ============================================================
-- 9. TESTIMONIALS
--    آراء العملاء — بتبني trust مهم جداً للـ freelance
-- ============================================================
create table testimonials (
  id            uuid primary key default uuid_generate_v4(),
  client_name   text not null,
  client_title  text,                               -- "CEO at XYZ"
  client_company text,
  client_avatar text,                               -- رابط صورة
  content       text not null,                      -- نص الـ testimonial
  project_id    uuid references projects(id) on delete set null,
  rating        int default 5 check (rating between 1 and 5),
  is_featured   boolean default false,
  display_order int default 0,
  created_at    timestamptz default now()
);

-- ============================================================
-- 10. BLOG_POSTS (Journal)
--     ده موجود في التصميم — "Journal" في الـ navbar
-- ============================================================
create table blog_posts (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  slug         text unique not null,
  excerpt      text,                                -- ملخص قصير للـ preview
  content      text,                               -- المحتوى الكامل (Markdown)
  cover_url    text,
  tags         text[] default '{}',               -- ['Design', 'React', 'Tips']
  is_published boolean default false,
  published_at timestamptz,
  reading_time int,                                -- بالدقايق
  created_at   timestamptz default now()
);

-- ============================================================
-- 11. CONTACT_MESSAGES
--     رسايل الـ Contact form
-- ============================================================
create table contact_messages (
  id           uuid primary key default uuid_generate_v4(),
  full_name    text not null,
  email        text not null,
  subject      text,                               -- موضوع الرسالة
  message      text not null,
  budget       text,                               -- "$500–$1000" — اختياري
  project_type text,                              -- dev | design | both
  is_read      boolean default false,
  sent_at      timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profile enable row level security;
create policy "Public read profile" on profile for select using (true);
create policy "Auth update profile" on profile for update using (auth.role() = 'authenticated');

alter table projects enable row level security;
create policy "Public read projects" on projects for select using (true);
create policy "Auth manage projects" on projects for all using (auth.role() = 'authenticated');

alter table skill_categories enable row level security;
create policy "Public read skill_categories" on skill_categories for select using (true);
create policy "Auth manage skill_categories" on skill_categories for all using (auth.role() = 'authenticated');

alter table skills enable row level security;
create policy "Public read skills" on skills for select using (true);
create policy "Auth manage skills" on skills for all using (auth.role() = 'authenticated');

alter table certificates enable row level security;
create policy "Public read certificates" on certificates for select using (true);
create policy "Auth manage certificates" on certificates for all using (auth.role() = 'authenticated');

alter table experience enable row level security;
create policy "Public read experience" on experience for select using (true);
create policy "Auth manage experience" on experience for all using (auth.role() = 'authenticated');

alter table milestones enable row level security;
create policy "Public read milestones" on milestones for select using (true);
create policy "Auth manage milestones" on milestones for all using (auth.role() = 'authenticated');

alter table services enable row level security;
create policy "Public read services" on services for select using (true);
create policy "Auth manage services" on services for all using (auth.role() = 'authenticated');

alter table testimonials enable row level security;
create policy "Public read testimonials" on testimonials for select using (true);
create policy "Auth manage testimonials" on testimonials for all using (auth.role() = 'authenticated');

alter table blog_posts enable row level security;
create policy "Public read published posts" on blog_posts for select using (is_published = true);
create policy "Auth manage blog" on blog_posts for all using (auth.role() = 'authenticated');

alter table contact_messages enable row level security;
create policy "Public insert contact" on contact_messages for insert with check (true);
create policy "Auth read contact" on contact_messages for select using (auth.role() = 'authenticated');
create policy "Auth update contact" on contact_messages for update using (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA
-- ============================================================

-- Profile
insert into profile (
  name, title, tagline, bio, philosophy,
  location, email,
  availability_status, open_to_freelance, open_to_fulltime,
  github_url, linkedin_url, behance_url, dribbble_url, cv_url,
  years_of_experience
) values (
  'Ibrahim Ezzeldin',
  'Full Stack Developer & Graphic Designer',
  'The Digital Artisan',
  'A Digital Artisan bridging the gap between sophisticated aesthetics and high-performance engineering. Focused on building tactile, immersive web experiences with intentional design.',
  'I believe software should feel like a bespoke timepiece—precise in its mechanics, yet human in its touch.',
  'Cairo, Egypt',
  'hello@ibrahimezzeldin.dev',
  'OPEN',
  true,
  true,
  'https://github.com/ibrahimezzeldin',
  'https://linkedin.com/in/ibrahimezzeldin',
  'https://behance.net/ibrahimezzeldin',
  'https://dribbble.com/ibrahimezzeldin',
  'https://read.cv/ibrahimezzeldin',
  2
);

-- Projects — Dev
insert into projects (title, slug, description, type, tech_stack, design_tools, repo_url, live_demo_url, is_featured, display_order) values
  ('The Artisan Marketplace', 'artisan-marketplace',
   'A high-end e-commerce platform designed for boutique manufacturers. Architected a fluid micro-interaction system and a bespoke grid system that adapts to editorial content layouts.',
   'fullstack',
   array['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Supabase'],
   array['Figma'],
   'https://github.com/ibrahimezzeldin/artisan-marketplace',
   null, true, 1),

  ('Obsidian Analytics', 'obsidian-analytics',
   'Data-heavy dashboard for luxury logistics. Custom visualization library using SVG and D3 for real-time tracking with zero performance lag.',
   'dev',
   array['TypeScript', 'D3.js', 'Radix UI', 'Node.js'],
   array[],
   'https://github.com/ibrahimezzeldin/obsidian-analytics',
   null, true, 2),

  ('Editorial Engine', 'editorial-engine',
   'A headless CMS interface focused on typography and white space. Built to give editors a WYSIWYG experience mirroring final print-quality digital output.',
   'dev',
   array['React', 'GraphQL', 'Sanity', 'Node.js'],
   array[],
   'https://github.com/ibrahimezzeldin/editorial-engine',
   null, true, 3);

-- Projects — Design
insert into projects (title, slug, description, type, tech_stack, design_tools, behance_url, is_featured, display_order) values
  ('Luxury Brand Identity', 'luxury-brand-identity',
   'Complete brand identity system for a high-end fashion label. Covers logo, typography, color palette, packaging, and brand guidelines.',
   'design',
   array[],
   array['Illustrator', 'Photoshop', 'InDesign'],
   'https://behance.net/ibrahimezzeldin/luxury-brand',
   true, 4),

  ('Editorial Layout System', 'editorial-layout',
   'Magazine-style layout system for a digital publication. Focused on typographic hierarchy and visual rhythm across 40+ page templates.',
   'design',
   array[],
   array['InDesign', 'Illustrator', 'Figma'],
   null,
   false, 5);

-- Skill Categories + Skills
with cats as (
  insert into skill_categories (name, description, icon, type, display_order) values
    ('Frontend Core',      'Architecture of modern interfaces, optimized for performance.',           '🖥️', 'dev',    1),
    ('Backend & Data',     'Server-side engineering and scalable database architecture.',             '⚙️', 'dev',    2),
    ('Styling & Motion',   'Bridging static design and fluid, cinematic interactions.',              '🎨', 'both',   3),
    ('Tools & Ecosystem',  'Streamlined workflows from commit to deployment.',                       '🔧', 'dev',    4),
    ('Design Software',    'Industry-standard tools for visual and brand design.',                   '✏️', 'design', 5),
    ('Brand & Visual',     'Visual identity, typography, and print design expertise.',               '🖋️', 'design', 6)
  returning id, name
)
insert into skills (category_id, name, display_order)
select c.id, s.skill, s.ord from cats c
join (values
  ('Frontend Core',     'React',              1),
  ('Frontend Core',     'Next.js',            2),
  ('Frontend Core',     'TypeScript',         3),
  ('Frontend Core',     'JavaScript',         4),
  ('Frontend Core',     'HTML5',              5),
  ('Frontend Core',     'CSS3',               6),
  ('Backend & Data',    'Node.js',            1),
  ('Backend & Data',    'Supabase',           2),
  ('Backend & Data',    'PostgreSQL',         3),
  ('Backend & Data',    'REST APIs',          4),
  ('Backend & Data',    'GraphQL',            5),
  ('Styling & Motion',  'Tailwind CSS',       1),
  ('Styling & Motion',  'Framer Motion',      2),
  ('Styling & Motion',  'GSAP',               3),
  ('Styling & Motion',  'SASS/SCSS',          4),
  ('Styling & Motion',  'Design Systems',     5),
  ('Tools & Ecosystem', 'Git / GitHub',       1),
  ('Tools & Ecosystem', 'Vercel',             2),
  ('Tools & Ecosystem', 'Vite / Webpack',     3),
  ('Tools & Ecosystem', 'Figma',              4),
  ('Tools & Ecosystem', 'CI/CD',              5),
  ('Design Software',   'Adobe Illustrator',  1),
  ('Design Software',   'Adobe Photoshop',    2),
  ('Design Software',   'Adobe InDesign',     3),
  ('Design Software',   'Adobe XD',           4),
  ('Design Software',   'Figma',              5),
  ('Design Software',   'Canva Pro',          6),
  ('Brand & Visual',    'Brand Identity',     1),
  ('Brand & Visual',    'Typography',         2),
  ('Brand & Visual',    'Print Design',       3),
  ('Brand & Visual',    'Packaging Design',   4),
  ('Brand & Visual',    'Logo Design',        5),
  ('Brand & Visual',    'Motion Graphics',    6)
) as s(cat, skill, ord) on c.name = s.cat;

-- Certificates
insert into certificates (title, issuer, icon_type, issued_year, display_order) values
  ('Meta Front-End Developer Professional Certificate', 'META VIA COURSERA',   'badge',     2024, 1),
  ('Google UX Design Professional Certificate',         'GOOGLE VIA COURSERA', 'person',    2023, 2),
  ('Advanced JavaScript Performance',                   'FRONTEND MASTERS',    'lightning', 2024, 3),
  ('Adobe Certified Professional — Visual Design',      'ADOBE',               'design',    2023, 4);

-- Experience
insert into experience (role, company, employment_type, location_type, city,
                        period_start, period_end, responsibilities, technologies, key_achievement, display_order) values
  ('Senior Full Stack Developer', 'Elite Digital Studio',
   'FULL-TIME', 'REMOTE', null, '2024', 'PRESENT',
   array[
     'Leading architectural shift from legacy frameworks to modern Next.js ecosystem.',
     'Engineering highly performant, accessible component libraries.',
     'Bridging brand design and technical implementation via meticulous attention to detail.'
   ],
   array['React 18', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Supabase'],
   'Reduced main-thread blocking time by 40% through aggressive code-splitting and asset optimization.',
   1),

  ('UI Developer & Graphic Designer', 'Artisan Tech Solutions',
   'HYBRID', 'HYBRID', 'Cairo', '2023', '2024',
   array[
     'Developing bespoke interface elements for high-end client portfolios.',
     'Creating brand identity systems including logos, typography, and visual guidelines.',
     'Implementing responsive layouts with a focus on fluid typography and grid systems.'
   ],
   array['JavaScript', 'SCSS', 'Three.js', 'Adobe Illustrator', 'Figma'],
   null,
   2),

  ('Freelance Designer & Developer', 'Self-Employed',
   'FREELANCE', 'REMOTE', null, '2022', 'PRESENT',
   array[
     'Delivering end-to-end digital products — from brand identity to deployed web applications.',
     'Working with clients across Egypt, UAE, and Europe on diverse creative briefs.'
   ],
   array['React', 'Node.js', 'Figma', 'Adobe Suite'],
   null,
   3);

-- Milestones
insert into milestones (title, period, description, display_order) values
  ('Elevating the Craft',       '2024 — PRESENT',
   'Transitioned into specialized full-stack engineering, merging design precision with scalable architecture and performance-first development.',
   1),
  ('Foundation of Engineering', '2023 — 2024',
   'Mastered the modern web stack while maintaining strong roots in visual design — the intersection that defines the "Digital Artisan" philosophy.',
   2),
  ('The Design Origins',        '2022 — 2023',
   'Started as a graphic designer specializing in brand identity and print media. Discovered code as a natural extension of visual thinking.',
   3);

-- Services
insert into services (title, description, icon, type, features, starting_price, display_order) values
  ('Full Stack Development', 'End-to-end web applications built with modern technologies, optimized for performance and scalability.',
   '⚙️', 'dev',
   array['React / Next.js frontend', 'Node.js + Supabase backend', 'REST / GraphQL APIs', 'Deployment & CI/CD', 'Performance optimization'],
   'Starting at $800',
   1),

  ('UI/UX Design & Prototyping', 'High-fidelity interfaces designed in Figma — from wireframes to pixel-perfect prototypes ready for handoff.',
   '🖥️', 'design',
   array['User research & wireframes', 'High-fidelity Figma designs', 'Interactive prototypes', 'Design system creation', 'Developer handoff'],
   'Starting at $400',
   2),

  ('Brand Identity & Visual Design', 'Complete visual identity systems that communicate your brand with precision and personality.',
   '✏️', 'design',
   array['Logo design', 'Typography & color system', 'Brand guidelines', 'Print materials', 'Social media kit'],
   'Starting at $500',
   3),

  ('Design-to-Code', 'You bring the Figma file, I bring it to life in pixel-perfect, animated, production-ready code.',
   '🔄', 'both',
   array['Pixel-perfect implementation', 'Framer Motion animations', 'Responsive across all devices', 'Clean maintainable code'],
   'Starting at $300',
   4);

-- Testimonials
insert into testimonials (client_name, client_title, client_company, content, rating, is_featured, display_order) values
  ('Sarah Mitchell', 'CEO', 'Luxe Brand Co.',
   'Ibrahim delivered beyond expectations. The brand identity he created perfectly captures our luxury positioning — every detail felt considered and intentional.',
   5, true, 1),

  ('Ahmed Karim', 'CTO', 'Fintech Startup',
   'Working with Ibrahim on our dashboard was exceptional. He understood both the design vision and the technical constraints, delivering a product that performs beautifully.',
   5, true, 2),

  ('Marie Dupont', 'Creative Director', 'Paris Agency',
   'Rare to find someone who speaks both design and engineering fluently. Ibrahim bridged our team gap and delivered a polished product on time.',
   5, true, 3);

-- ============================================================
-- USEFUL QUERIES
-- ============================================================

-- كل المشاريع مقسمة حسب النوع
-- select * from projects where type = 'dev' order by display_order;
-- select * from projects where type = 'design' order by display_order;
-- select * from projects where type = 'fullstack' order by display_order;

-- المشاريع الـ featured للـ Home
-- select * from projects where is_featured = true order by display_order;

-- Skills مجمعة مع الـ categories
-- select sc.name, sc.icon, sc.type, array_agg(s.name order by s.display_order) as skills
-- from skill_categories sc join skills s on s.category_id = sc.id
-- group by sc.id order by sc.display_order;

-- الـ Testimonials الـ featured
-- select * from testimonials where is_featured = true order by display_order;

-- الرسايل الجديدة
-- select * from contact_messages where is_read = false order by sent_at desc;

-- Blog posts المنشورة
-- select * from blog_posts where is_published = true order by published_at desc;
