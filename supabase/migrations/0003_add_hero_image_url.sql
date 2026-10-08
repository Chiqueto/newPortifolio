-- Add hero_image_url column to profile
ALTER TABLE public.profile 
ADD COLUMN IF NOT EXISTS hero_image_url text;
