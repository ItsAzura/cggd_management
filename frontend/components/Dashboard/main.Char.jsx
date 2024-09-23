'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

export const description = 'A bar chart with a label';

const getRandomOrder = () => {
  return Math.floor(Math.random() * (500 - 120 + 1)) + 120;
};

const chartData = [
  { month: 'January', order: getRandomOrder() },
  { month: 'February', order: getRandomOrder() },
  { month: 'March', order: getRandomOrder() },
  { month: 'April', order: getRandomOrder() },
  { month: 'May', order: getRandomOrder() },
  { month: 'June', order: getRandomOrder() },
  { month: 'July', order: getRandomOrder() },
  { month: 'August', order: getRandomOrder() },
  { month: 'September', order: getRandomOrder() },
  { month: 'October', order: getRandomOrder() },
  { month: 'November', order: getRandomOrder() },
  { month: 'December', order: getRandomOrder() },
];
const chartConfig = {
  desktop: {
    label: 'Order',
    color: 'var(--chart-main)',
  },
};

export function MainChar() {
  return (
    <Card className="text-white border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out shadow-lg shadow-[rgba(41,125,204,0.1)]">
      <CardHeader>
        <CardTitle>Total Sales Every Month</CardTitle>
        <CardDescription>2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              className="text-white"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              className="bg-white text-black"
            />

            <Bar dataKey="order" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground text-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
