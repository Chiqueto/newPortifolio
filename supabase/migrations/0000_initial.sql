-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- PROFILE TABLE
CREATE TABLE profile (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    headline text,
    bio text,
    email text,
    phone text,
    location text,
    birth_date date,
    github_url text,
    linkedin_url text,
    instagram_url text,
    resume_url text,
    avatar_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- PROJECTS TABLE
CREATE TABLE projects (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text unique not null,
    short_description text,
    description text,
    status text not null,
    project_type text,
    featured boolean not null default false,
    published boolean not null default true,
    cover_image_url text,
    repository_url text,
    live_url text,
    start_date date,
    end_date date,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- PROJECT IMAGES TABLE
CREATE TABLE project_images (
    id uuid primary key default gen_random_uuid(),
    project_id uuid not null references projects(id) on delete cascade,
    image_url text not null,
    caption text,
    alt_text text,
    sort_order integer not null default 0,
    created_at timestamptz default now()
);

-- TECHNOLOGIES TABLE
CREATE TABLE technologies (
    id uuid primary key default gen_random_uuid(),
    name text unique not null,
    slug text unique not null,
    icon_url text,
    category text,
    sort_order integer default 0
);

-- PROJECT TECHNOLOGIES TABLE
CREATE TABLE project_technologies (
    project_id uuid references projects(id) on delete cascade,
    technology_id uuid references technologies(id) on delete cascade,
    PRIMARY KEY(project_id, technology_id)
);

-- EXPERIENCES TABLE
CREATE TABLE experiences (
    id uuid primary key default gen_random_uuid(),
    company text not null,
    role text not null,
    description text,
    company_logo_url text,
    start_date date not null,
    end_date date,
    current boolean default false,
    sort_order integer default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- EDUCATION TABLE
CREATE TABLE education (
    id uuid primary key default gen_random_uuid(),
    institution text not null,
    course text not null,
    degree text,
    start_date date,
    end_date date,
    current boolean default false,
    sort_order integer default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();


-- RLS Configuration
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public profiles are viewable by everyone" ON profile FOR SELECT USING (true);
CREATE POLICY "Published projects are viewable by everyone" ON projects FOR SELECT USING (published = true);
CREATE POLICY "Project images are viewable by everyone" ON project_images FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = project_images.project_id AND projects.published = true)
);
CREATE POLICY "Technologies are viewable by everyone" ON technologies FOR SELECT USING (true);
CREATE POLICY "Project technologies are viewable by everyone" ON project_technologies FOR SELECT USING (true);
CREATE POLICY "Experiences are viewable by everyone" ON experiences FOR SELECT USING (true);
CREATE POLICY "Education is viewable by everyone" ON education FOR SELECT USING (true);
