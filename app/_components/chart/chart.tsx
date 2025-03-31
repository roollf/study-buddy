"use client";

// import components
import { Label, Pie, PieChart } from "recharts";
import * as CardComponent from "@/components/ui/card";
import * as ChartComponent from "@/components/ui/chart";

// import context
import { useTimer } from "@/app/_context/timerContext";

// import utils
import formatTime from "@/app/_utils/formatTime";

// import custom hooks
import { useBreakpoint } from "@/app/_hooks/useBreakPoint";

// constants
const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function Chart() {
  const { selectedDataList } = useTimer();
  const isMobile = useBreakpoint();

  const groupedData = selectedDataList.reduce<
    Record<string, { disciplina: string; duration: number }>
  >((acc, item) => {
    if (acc[item.disciplina]) {
      acc[item.disciplina].duration += item.duration;
    } else {
      acc[item.disciplina] = {
        disciplina: item.disciplina,
        duration: item.duration,
      };
    }
    return acc;
  }, {});

  const aggregatedDataList = Object.values(groupedData);

  const chartConfig = aggregatedDataList.reduce((config, item, index) => {
    return {
      ...config,
      [item.disciplina]: {
        label: item.disciplina,
        color: CHART_COLORS[index % CHART_COLORS.length],
      },
    };
  }, {});

  const data = aggregatedDataList.map((item, index) => ({
    name: item.disciplina,
    value: item.duration,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <CardComponent.Card className="flex flex-col w-[200px] md:w-[400px]">
      <CardComponent.CardHeader className="flex flex-col items-center">
        <CardComponent.CardTitle>Estatísticas</CardComponent.CardTitle>
        <CardComponent.CardDescription className="text-center">
          Tempo gasto por matéria
        </CardComponent.CardDescription>
      </CardComponent.CardHeader>
      <CardComponent.CardContent>
        <ChartComponent.ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartComponent.ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const data = payload[0].payload;
                  return (
                    <div className="flex items-center gap-2 rounded-lg bg-background p-2 shadow-md border">
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: data.fill }}
                      />
                      <p className="flex items-center gap-2">
                        <span className="text-zinc-800 font-semibold">
                          {data.name}
                        </span>
                        <span className="text-zinc-500 font-semibold">
                          {formatTime(data.value)}
                        </span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={isMobile ? 30 : 80}
              outerRadius={isMobile ? 60 : 160}
              strokeWidth={isMobile ? 3 : 5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                          className="fill-foreground text-[12px] md:text-[24px] font-bold"
                        >
                          {formatTime(
                            data.reduce((acc, item) => acc + item.value, 0)
                          )}
                        </tspan>
                        {!isMobile && (
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + (isMobile ? 15 : 20)}
                            className="fill-muted-foreground"
                          >
                            Tempo total de estudo
                          </tspan>
                        )}
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartComponent.ChartContainer>
      </CardComponent.CardContent>
      <CardComponent.CardFooter className="flex flex-col gap-2 text-sm">
        <div className="flex flex-col items-center gap-2 font-medium leading-none">
          <div className="flex flex-col md:flex-row gap-1 text-center md:text-start">
            <span className="text-muted-foreground text-[12px] md:text-[14px]">
              Matéria mais estudada:
            </span>
            <span className="text-foreground text-[12px] md:text-[14px]">
              {
                aggregatedDataList.reduce(
                  (max, item) => (item.duration > max.duration ? item : max),
                  { disciplina: "Nenhuma", duration: 0 }
                ).disciplina
              }
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-1 text-center md:text-start">
            <span className="text-muted-foreground text-[12px] md:text-[14px]">
              Matéria menos estudada:
            </span>
            <span className="text-foreground text-[12px] md:text-[14px]">
              {
                aggregatedDataList.reduce(
                  (min, item) => (item.duration < min.duration ? item : min),
                  { disciplina: "Nenhuma", duration: Infinity }
                ).disciplina
              }
            </span>
          </div>
        </div>
      </CardComponent.CardFooter>
    </CardComponent.Card>
  );
}
