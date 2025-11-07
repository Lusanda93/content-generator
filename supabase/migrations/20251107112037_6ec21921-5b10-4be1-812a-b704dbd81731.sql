-- Add user_id column to generations table
ALTER TABLE public.generations
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can insert generations" ON public.generations;
DROP POLICY IF EXISTS "Anyone can view generations" ON public.generations;

-- Create user-scoped RLS policies
CREATE POLICY "Users can view their own generations"
ON public.generations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generations"
ON public.generations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generations"
ON public.generations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generations"
ON public.generations
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);