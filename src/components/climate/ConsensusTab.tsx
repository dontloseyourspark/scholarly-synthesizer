
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { consensusData, CHART_COLORS } from '@/data/climateChangeData';

const ConsensusTab = () => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Scientific Consensus on Climate Change</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="mb-6">
              Multiple studies published in peer-reviewed scientific journals show that 97% or more of actively publishing climate scientists agree 
              that climate-warming trends over the past century are extremely likely due to human activities.
            </p>
            <p>
              This consensus is supported by scientific academies and societies worldwide. A small number of scientists disagree with the consensus 
              position, but the vast majority of climate scientists have concluded that human-caused climate change is happening.
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={consensusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {consensusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsensusTab;
