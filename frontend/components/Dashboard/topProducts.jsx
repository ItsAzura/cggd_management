'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

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

export const description = 'A mixed bar chart';

const chartConfig = {
  orders: {
    label: 'Orders',
  },
  chrome: {
    label: 'Chan',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Ga',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Goi',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Dem',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
};

const getRandomProduct = () => {
  return Math.floor(Math.random() * (400 - 220 + 1)) + 120;
};

export function TopProducts() {
  const chartData = [
    {
      browser: 'chrome',
      orders: getRandomProduct(),
      fill: 'var(--color-chrome)',
    },
    {
      browser: 'safari',
      orders: getRandomProduct(),
      fill: 'var(--color-safari)',
    },
    {
      browser: 'firefox',
      orders: getRandomProduct(),
      fill: 'var(--color-firefox)',
    },
    {
      browser: 'edge',
      orders: getRandomProduct(),
      fill: 'var(--color-edge)',
    },
    {
      browser: 'other',
      orders: getRandomProduct(),
      fill: 'var(--color-other)',
    },
  ];
  return (
    <Card className="text-white border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out shadow-lg shadow-[rgba(41,125,204,0.1)]">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <XAxis dataKey="orders" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              className="bg-white text-black"
            />
            <Bar
              dataKey="orders"
              layout="vertical"
              radius={5}
              fill="var(--color-other)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 10.5% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total orders for the last year
        </div>
      </CardFooter>
    </Card>
  );
}
