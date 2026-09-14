-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Access for portfolio bucket" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');

-- For now, disable insert/update/delete, to be handled in TASK 02 with Auth
-- Or we can add authenticated-only policies now
CREATE POLICY "Authenticated users can upload to portfolio bucket" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Authenticated users can update portfolio bucket" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');
CREATE POLICY "Authenticated users can delete from portfolio bucket" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio');
