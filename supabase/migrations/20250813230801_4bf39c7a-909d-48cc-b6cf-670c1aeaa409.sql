-- Create storage bucket for topic visualization images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('topic-visualizations', 'topic-visualizations', true);

-- Create RLS policies for the topic visualizations bucket
CREATE POLICY "Public can view topic visualization images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'topic-visualizations');

CREATE POLICY "Authenticated users can upload topic visualization images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'topic-visualizations' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own topic visualization images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'topic-visualizations' AND auth.role() = 'authenticated');

-- Add image_url column to topic_visualizations table
ALTER TABLE public.topic_visualizations 
ADD COLUMN image_url TEXT;