import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { PieChartData } from '../../types/fruit.types';
import { CHART_COLORS } from '../../utils/constants';
import JarStatus from '../common/JarStatus';

interface JarChartProps {
  data: PieChartData[];
}

interface PieTooltipProps {
  active?: boolean;
  payload?: any[];
}

const PieTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const entry = payload[0];
    const { name, value, qty } = entry.payload;
    const color = entry.fill || entry.payload.fill || entry.color || CHART_COLORS[0];

    return (
      <div className="rounded-lg bg-white shadow-lg border px-3 py-2 text-sm">
        <p className="font-semibold flex items-center gap-2 mb-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          {name}
        </p>
        <p className="text-gray-600">
          {qty} item{qty > 1 ? 's' : ''} • {value} cal
        </p>
      </div>
    );
  }
  return null;
};

const JarChart: React.FC<JarChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
    <JarStatus isEmpty={true} />
    )
  }

  return (
    <div className="bg-green-100 p-4 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-center">Calories Pie Chart</h3>
      <div className="flex justify-center items-center">
        <ResponsiveContainer width={400} height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>      
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1 text-xs">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
            />
            <span className="text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JarChart;