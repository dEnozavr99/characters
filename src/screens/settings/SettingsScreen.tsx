import { Button, View, Text, StyleSheet } from "react-native";
import React from "react";

import { useMQTTClient, useMQTTConnection } from "../../hooks";

const SettingsScreen = () => {
  const { isConnected, data, errorMessage } = useMQTTClient();
  const {
    handleConnect,
    handleDisconnect,
    handleSubscribe,
    handleUnsubscribe,
    handlePublish,
  } = useMQTTConnection();

  const statusColor = isConnected ? "green" : "red";

  return (
    <View style={styles.container}>
      <View style={styles.captionsContainer}>
        <Text
          style={{ color: statusColor }}
        >{`Client is: ${isConnected ? "connected" : "disconnected"}`}</Text>
        <Text>{`Topic: ${data?.topic} | Message: ${data?.message}`}</Text>
        {errorMessage && <Text>{`Error: ${errorMessage}`}</Text>}
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

export default SettingsScreen;
