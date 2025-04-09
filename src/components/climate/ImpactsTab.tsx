
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { impactData } from '@/data/climateChangeData';

const ImpactsTab = () => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Measurable Climate Impacts</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              Climate change is already affecting every region on Earth. The impacts of climate change are being felt in the form of:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Rising global temperatures</li>
              <li>Sea level rise due to melting ice sheets and glaciers</li>
              <li>Increased concentration of carbon dioxide in the atmosphere</li>
              <li>Loss of Arctic sea ice</li>
              <li>More frequent and intense extreme weather events</li>
              <li>Shifts in plant and animal ranges</li>
              <li>Longer or more intense droughts</li>
            </ul>
            <p>
              These impacts are projected to intensify in the coming decades, with the severity dependent on the amount 
              of heat-trapping gases emitted globally and how sensitive the Earth's climate is to those emissions.
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={impactData}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 50,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="category" />
                <Tooltip />
                <Bar dataKey="value">
                  {impactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Note: CO₂ value shown at reduced scale (actual value: 415 ppm)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactsTab;
