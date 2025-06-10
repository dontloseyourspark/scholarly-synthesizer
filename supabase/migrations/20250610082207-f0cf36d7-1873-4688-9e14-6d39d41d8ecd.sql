
-- Create scholars table to store scholar information
CREATE TABLE public.scholars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  institution TEXT,
  avatar_url TEXT,
  credentials TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create insights table to store scholar insights
CREATE TABLE public.insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id BIGINT REFERENCES public.topics(id) ON DELETE CASCADE,
  scholar_id UUID REFERENCES public.scholars(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  position TEXT CHECK (position IN ('support', 'neutral', 'against')) NOT NULL,
  confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create insight_sources table to link insights with sources
CREATE TABLE public.insight_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID REFERENCES public.insights(id) ON DELETE CASCADE,
  source_id BIGINT REFERENCES public.sources(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create votes table to track user votes on insights
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID REFERENCES public.insights(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('up', 'down')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(insight_id, user_id)
);

-- Create discussions table for topic discussions
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id BIGINT REFERENCES public.topics(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Update sources table to include more fields
ALTER TABLE public.sources ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.sources ADD COLUMN IF NOT EXISTS publication TEXT;
ALTER TABLE public.sources ADD COLUMN IF NOT EXISTS year INTEGER;
ALTER TABLE public.sources ADD COLUMN IF NOT EXISTS doi TEXT;

-- Enable Row Level Security
ALTER TABLE public.scholars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insight_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for scholars (public read access)
CREATE POLICY "Anyone can view scholars" ON public.scholars FOR SELECT USING (true);

-- Create RLS policies for insights (public read access)
CREATE POLICY "Anyone can view insights" ON public.insights FOR SELECT USING (true);

-- Create RLS policies for insight_sources (public read access)
CREATE POLICY "Anyone can view insight sources" ON public.insight_sources FOR SELECT USING (true);

-- Create RLS policies for votes (users can only see their own votes)
CREATE POLICY "Users can view their own votes" ON public.votes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own votes" ON public.votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own votes" ON public.votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own votes" ON public.votes FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for discussions (public read, authenticated write)
CREATE POLICY "Anyone can view discussions" ON public.discussions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create discussions" ON public.discussions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own discussions" ON public.discussions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own discussions" ON public.discussions FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_insights_topic_id ON public.insights(topic_id);
CREATE INDEX idx_insights_scholar_id ON public.insights(scholar_id);
CREATE INDEX idx_insight_sources_insight_id ON public.insight_sources(insight_id);
CREATE INDEX idx_insight_sources_source_id ON public.insight_sources(source_id);
CREATE INDEX idx_votes_insight_id ON public.votes(insight_id);
CREATE INDEX idx_votes_user_id ON public.votes(user_id);
CREATE INDEX idx_discussions_topic_id ON public.discussions(topic_id);
CREATE INDEX idx_discussions_parent_id ON public.discussions(parent_id);

-- Create function to update vote counts on insights
CREATE OR REPLACE FUNCTION update_insight_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE public.insights SET upvotes = upvotes + 1 WHERE id = NEW.insight_id;
    ELSE
      UPDATE public.insights SET downvotes = downvotes + 1 WHERE id = NEW.insight_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle vote type change
    IF OLD.vote_type = 'up' AND NEW.vote_type = 'down' THEN
      UPDATE public.insights SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = NEW.insight_id;
    ELSIF OLD.vote_type = 'down' AND NEW.vote_type = 'up' THEN
      UPDATE public.insights SET downvotes = downvotes - 1, upvotes = upvotes + 1 WHERE id = NEW.insight_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE public.insights SET upvotes = upvotes - 1 WHERE id = OLD.insight_id;
    ELSE
      UPDATE public.insights SET downvotes = downvotes - 1 WHERE id = OLD.insight_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update vote counts
CREATE TRIGGER trigger_update_vote_counts
  AFTER INSERT OR UPDATE OR DELETE ON public.votes
  FOR EACH ROW EXECUTE FUNCTION update_insight_vote_counts();
