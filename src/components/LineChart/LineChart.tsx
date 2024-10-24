import React, { useEffect, useState } from "react";

import { LineChart as BaseLineChart } from "react-native-chart-kit";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

type IncomingValue = {
  label: string;
  value: number;
};

type LineChartProps = {
  nextValue: IncomingValue;
  width: number;
  height: number;
};

const LineChart = ({ nextValue, width, height }: LineChartProps) => {
  const [chartData, setChartData] = useState<LineChartData>({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    setChartData((prevData) => {
      const { label, value } = nextValue;
      const nexData = { ...prevData };

      nexData.labels.push(label);
      nexData.datasets[0].data.push(value);

      return nexData;
    });
  }, [nextValue]);

  return (
    <BaseLineChart
      bezier
      data={chartData}
      width={width}
      height={height}
      chartConfig={{
        color: () => "#1db796",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
      }}
    />
  );
};

export default LineChart;
