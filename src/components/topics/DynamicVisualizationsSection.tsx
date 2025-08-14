
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConsensusChart from '@/components/common/ConsensusChart';
import { useTopicVisualizations } from '@/hooks/useTopicVisualizations';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorCard from '@/components/common/ErrorCard';

type DynamicVisualizationsSectionProps = {
  topicId: number;
};

const DynamicVisualizationsSection: React.FC<DynamicVisualizationsSectionProps> = ({ topicId }) => {
  const { visualizations, loading, error, refetch } = useTopicVisualizations(topicId);

  if (loading) {
    return <LoadingSpinner message="Loading visualizations..." />;
  }

  if (error) {
    return <ErrorCard error={`Error loading visualizations: ${error}`} onRetry={refetch} />;
  }

  if (visualizations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No visualizations available for this topic.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue={visualizations[0]?.tab_key} className="w-full">
      <TabsList className="mb-8">
        {visualizations.map((viz) => (
          <TabsTrigger key={viz.tab_key} value={viz.tab_key}>
            {viz.tab_label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {visualizations.map((viz) => (
        <TabsContent key={viz.tab_key} value={viz.tab_key}>
          {viz.chart_type === 'consensus' ? (
            <ConsensusChart
              title={viz.chart_config?.title || viz.content_title || 'Scientific Consensus'}
              data={viz.chart_data || []}
              description={viz.chart_config?.description || [viz.content_description || '']}
              source={viz.source_citation}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{viz.content_title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {viz.content_description && (
                  <p className="text-muted-foreground">
                    {viz.content_description}
                  </p>
                )}
                {viz.image_url && (
                  <div className="w-full flex justify-center">
                    <img 
                      src={viz.image_url} 
                      alt={viz.content_title || 'Visualization'} 
                      className="rounded-lg shadow-md"
                      style={{ maxWidth: '730px', width: '100%' }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DynamicVisualizationsSection;
