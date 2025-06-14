import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const CallToActionCard = () => (
  <Card className="bg-scholarly-blue text-white border-none">
    <CardContent className="p-8 text-center">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Join the Climate Conversation</h2>
      <p className="mb-6 text-scholarly-lightGray max-w-3xl mx-auto">
        Contribute to the scholarly discussion on climate change. Add insights, evaluate evidence, 
        and help build a comprehensive resource for understanding this global challenge.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              variant="default"
              className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray hover:text-scholarly-blue"
              asChild
            >
              <Link to="/contribute">Contribute an Insight</Link>
            </Button>
          </div>
    </CardContent>
  </Card>
);

export default CallToActionCard;