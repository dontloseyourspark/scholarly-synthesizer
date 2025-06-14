
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useSearchNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const navigateToSearch = (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a topic to search.",
        variant: "destructive",
      });
      return;
    }
    
    const processedQuery = query.trim().toLowerCase().replace(/\s+/g, '-');
    navigate(`/topics?q=${encodeURIComponent(processedQuery)}`);
  };

  const clearSearch = () => {
    navigate('/topics', { replace: true });
  };

  return {
    navigateToSearch,
    clearSearch
  };
};
