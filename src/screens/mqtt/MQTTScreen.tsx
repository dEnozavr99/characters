import { Button, View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

import { useMQTTConnection } from "./useMQTTConnection";

import { CircularProgress } from "../../components";

const MQTTScreen = () => {
  const {
    isClientConnected,
    currentData,
    errorMessage,
    handleConnect,
    handleDisconnect,
    handleSubscribe,
    handleUnsubscribe,
    handlePublish,
  } = useMQTTConnection();

  const [animationValue, setAnimationValue] = useState<number>(0);

  const statusColor = isClientConnected ? "green" : "red";

  const handleIncreaseValue = () => {
    setAnimationValue((prevValue) => prevValue + 10);
  };

  const handleDecreaseValue = () => {
    setAnimationValue((prevValue) => prevValue - 10);
  };

  return (
    <View style={styles.container}>
      <View style={styles.captionsContainer}>
        <Text
          style={{ color: statusColor }}
        >{`Client is: ${isClientConnected ? "connected" : "disconnected"}`}</Text>
        <Text>{`Topic: ${currentData?.topic} | Message: ${currentData?.message}`}</Text>
        <Text>{`Error: ${errorMessage}`}</Text>
      </View>

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

      <View style={styles.footerContainer}>
        <View style={styles.buttonsContainer}>
          <Button color="green" title="Connect" onPress={handleConnect} />
          <Button color="red" title="Disconnect" onPress={handleDisconnect} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button title="Subscribe" onPress={handleSubscribe} />
          <Button title="Publish" onPress={handlePublish} />
          <Button title="Unsubscribe" onPress={handleUnsubscribe} />
        </View>
      </View>
    </View>
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

export default MQTTScreen;
