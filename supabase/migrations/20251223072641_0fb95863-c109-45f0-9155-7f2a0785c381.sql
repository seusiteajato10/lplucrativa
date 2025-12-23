-- Add RLS policy to allow users to update and delete their own leads
CREATE POLICY "Users can update own leads" 
ON public.leads_captured 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own leads" 
ON public.leads_captured 
FOR DELETE 
USING (auth.uid() = user_id);