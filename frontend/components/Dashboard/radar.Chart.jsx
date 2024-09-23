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

const getRandomProduct = () => {
  return Math.floor(Math.random() * (300 - 120 + 1)) + 120;
};

const chartData = [
  { month: 'January', customer: getRandomProduct() },
  { month: 'February', customer: getRandomProduct() },
  { month: 'March', customer: getRandomProduct() },
  { month: 'April', customer: getRandomProduct() },
  { month: 'May', customer: getRandomProduct() },
  { month: 'June', customer: getRandomProduct() },
];

const chartConfig = {
  desktop: {
    label: 'customer',
    color: 'hsl(var(--chart-1))',
  },
};

export function SpiderChart() {
  return (
    <Card className="text-white border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out shadow-lg shadow-[rgba(41,125,204,0.1)]">
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              className="bg-white text-black"
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="customer"
              fill="var(--toastify-color-info)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
