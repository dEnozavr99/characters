import React, { useEffect, useState } from "react";

import { LineChart as BaseLineChart } from "react-native-chart-kit";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

// const getCurrentTimeString = () => {
//   const currentDate = new Date();
//   const formatter = new Intl.DateTimeFormat("ua-UA", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//   });

//   return formatter.format(currentDate);
// };

type IncomingValue = {
  label: string;
  values: number[];
};

type LineChartProps = {
  nextValue: IncomingValue;
  width: number;
  height: number;
};

const LineChart = ({ nextValue, width, height }: LineChartProps) => {
  const [chartData, setChartData] = useState<LineChartData>({
    labels: [],
    datasets: [
      { data: [], color: () => "#1db796" },
      { data: [], color: () => "#ff0000", withDots: false },
    ],
  });

  useEffect(() => {
    setChartData((prevData) => {
      const { label, values } = nextValue;
      const nexData = { ...prevData };

      nexData.labels.push(label);
      values.forEach((value, index) => {
        nexData.datasets[index].data.push(value);
      });

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
        color: () => "#095103",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
      }}
    />
  );
};

export default LineChart;
