-- Create inquiries table for storing user quote requests
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  language VARCHAR(10) DEFAULT 'en',
  traveler_type VARCHAR(50), -- solo, couple, family, school, corporate
  package_tier VARCHAR(50), -- essential, deluxe, premium
  destinations TEXT[], -- array of selected destinations
  travel_dates VARCHAR(255),
  group_size INTEGER,
  special_requirements TEXT,
  budget_range VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, converted, closed
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert inquiries (public form)
CREATE POLICY "Anyone can submit inquiries" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_inquiries_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();