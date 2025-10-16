-- Create table for generation history
CREATE TABLE IF NOT EXISTS public.generations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'code', 'video')),
  prompt TEXT NOT NULL,
  result TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view all generations (public feature)
CREATE POLICY "Anyone can view generations"
ON public.generations
FOR SELECT
USING (true);

-- Create policy to allow anyone to insert generations
CREATE POLICY "Anyone can insert generations"
ON public.generations
FOR INSERT
WITH CHECK (true);