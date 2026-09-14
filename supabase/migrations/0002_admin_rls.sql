-- Admin policies for Profile
CREATE POLICY "Admin can insert profile" ON profile FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update profile" ON profile FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete profile" ON profile FOR DELETE TO authenticated USING (true);

-- Admin policies for Projects
CREATE POLICY "Admin can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete projects" ON projects FOR DELETE TO authenticated USING (true);
CREATE POLICY "Admin can select all projects" ON projects FOR SELECT TO authenticated USING (true);

-- Admin policies for Project Images
CREATE POLICY "Admin can insert project_images" ON project_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update project_images" ON project_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete project_images" ON project_images FOR DELETE TO authenticated USING (true);
CREATE POLICY "Admin can select all project_images" ON project_images FOR SELECT TO authenticated USING (true);

-- Admin policies for Technologies
CREATE POLICY "Admin can insert technologies" ON technologies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update technologies" ON technologies FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete technologies" ON technologies FOR DELETE TO authenticated USING (true);

-- Admin policies for Project Technologies
CREATE POLICY "Admin can insert project_technologies" ON project_technologies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update project_technologies" ON project_technologies FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete project_technologies" ON project_technologies FOR DELETE TO authenticated USING (true);

-- Admin policies for Experiences
CREATE POLICY "Admin can insert experiences" ON experiences FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update experiences" ON experiences FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete experiences" ON experiences FOR DELETE TO authenticated USING (true);

-- Admin policies for Education
CREATE POLICY "Admin can insert education" ON education FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update education" ON education FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete education" ON education FOR DELETE TO authenticated USING (true);
