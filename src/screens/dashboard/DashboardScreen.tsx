import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { CircularProgress, LineChart } from "../../components";

import { useMQTTClient } from "../../hooks";

import { getCurrentTimeString } from "../../utils";

const DashboardScreen = () => {
  const { isConnected, data } = useMQTTClient();

  const [threshold, setThreshold] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchThreshold = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("http://192.168.31.93:8080/api/threshold");
        const { threshold: thresholdData } = await response.json();

        setThreshold(thresholdData);
      } catch (error) {
        console.error("Error while fetching threshold: " + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreshold();
  }, []);

  const temperatureValue = useMemo(
    () => (!isNaN(Number(data?.message)) ? Number(data?.message) : 0),
    [data?.message]
  );
  const chartValue = useMemo(
    () => ({
      label: getCurrentTimeString(),
      values: [temperatureValue, threshold],
    }),
    [temperatureValue, threshold]
  );

  const shouldRenderChart = isConnected && temperatureValue !== 0;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <CircularProgress progressValue={temperatureValue} />
          <Text>Temperature</Text>
        </View>

        <View style={styles.progressContainer}>
          <ActivityIndicator animating={isLoading} size="small" />
          <Text>{`Threshold is: ${threshold}`}</Text>
        </View>

        <View style={styles.footerContainer}>
          {shouldRenderChart && (
            <LineChart
              nextValue={chartValue}
              width={Dimensions.get("window").width - 32}
              height={200}
            />
          )}
        </View>
      </View>
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
