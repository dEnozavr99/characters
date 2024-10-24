import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";

import { LineChart } from "react-native-chart-kit";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

import { CircularProgress } from "../../components";

import { useMQTTClient } from "../../hooks";

const getCurrentTimeString = () => {
  const currentDate = new Date();
  const formatter = new Intl.DateTimeFormat("ua-UA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formatter.format(currentDate);
};

const DashboardScreen = () => {
  const { isConnected, data } = useMQTTClient();

  const [temperatureData, setTemperatureData] = useState<LineChartData>({
    labels: [],
    datasets: [{ data: [] }],
  });

  const temperatureValue = useMemo(
    () => (!isNaN(Number(data?.message)) ? Number(data?.message) : 0),
    [data?.message]
  );

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    setTemperatureData((prevData) => {
      const nextData = { ...prevData };
      const nextLabel = getCurrentTimeString();
      const [nextDataset] = nextData.datasets;

      nextData.labels.push(nextLabel);
      nextDataset.data.push(temperatureValue);
      nextData.datasets = [nextDataset];

      return nextData;
    });
  }, [isConnected, temperatureValue]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <CircularProgress progressValue={temperatureValue} />
          <Text>Temperature</Text>
        </View>
      </View>

      {!!temperatureData.labels.length && (
        <View style={styles.footerContainer}>
          <LineChart
            data={temperatureData}
            width={Dimensions.get("window").width - 32}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 32,
  },
  captionsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 32,
  },
  footerContainer: {
    flex: 1,
    gap: 32,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressContainer: {
    alignItems: "center",
  },
});

export default DashboardScreen;
