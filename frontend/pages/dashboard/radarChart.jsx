'use client';

import { TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A radar chart';

const chartData = [
  { month: 'January', visiter: 186 },
  { month: 'February', visiter: 305 },
  { month: 'March', visiter: 237 },
  { month: 'April', visiter: 273 },
  { month: 'May', visiter: 209 },
  { month: 'June', visiter: 214 },
];

const chartConfig = {
  desktop: {
    label: 'visiter',
    color: 'hsl(var(--chart-1))',
  },
};

export function SpiderChart() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Orders By Month</CardTitle>
        <CardDescription>
          Showing total orders for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="visiter"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
