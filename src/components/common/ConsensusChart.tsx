
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ConsensusData {
  name: string;
  value: number;
  color: string;
}

interface ConsensusChartProps {
  title: string;
  data: ConsensusData[];
  description: string[];
  source?: string;
}

const ConsensusChart = ({ title, data, description, source }: ConsensusChartProps) => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {description.map((paragraph, index) => (
              <p key={index} className={index === description.length - 1 ? "" : "mb-6"}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {source && (
          <p className="text-sm text-gray-600 mt-4">
            Source: <span dangerouslySetInnerHTML={{ __html: source }} />
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ConsensusChart;
