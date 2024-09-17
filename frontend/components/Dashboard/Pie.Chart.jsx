'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

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

export const description = 'A donut chart with text';

const chartData = [
  { browser: 'chrome', orders: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', orders: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', orders: 287, fill: 'var(--color-firefox)' },
  { browser: 'edge', orders: 173, fill: 'var(--color-edge)' },
  { browser: 'other', orders: 190, fill: 'var(--color-other)' },
];

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

export function CirleChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.orders, 0);
  }, []);

  return (
    <Card className="flex flex-col text-white border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out shadow-lg shadow-[rgba(41,125,204,0.1)]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Orders By Category</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              className="bg-white text-black"
            />
            <Pie
              data={chartData}
              dataKey="orders"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold "
                          fill="hsl(var(--chart-5))"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                          fill="hsl(var(--chart-5))"
                        >
                          Orders
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
}
