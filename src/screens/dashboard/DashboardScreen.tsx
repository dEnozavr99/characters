import React, { useState } from "react";

import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { CircularProgress } from "../../components";

const DashboardScreen = () => {
  const [animationValue, setAnimationValue] = useState(0);

  const handleIncreaseValue = () => {
    setAnimationValue((prevValue) => prevValue + 10);
  };

  const handleDecreaseValue = () => {
    setAnimationValue((prevValue) => prevValue - 10);
  };

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <CircularProgress progressValue={animationValue} />
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.buttonsContainer}>
            <Button
              color="green"
              title="Increase value"
              onPress={handleIncreaseValue}
            />
            <Button
              color="red"
              title="Decrease value"
              onPress={handleDecreaseValue}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "space-evenly",
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
