import { Button, View, Text, StyleSheet, Easing } from "react-native";
import React, { useRef } from "react";

import { AnimatedCircularProgress } from "react-native-circular-progress";

import { useMQTTConnection } from "./useMQTTConnection";

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

  const statusColor = isClientConnected ? "green" : "red";

  const progressRef = useRef<AnimatedCircularProgress>(null);

  const handleForvardProgress = () => {
    const { current } = progressRef;

    if (!current) {
      return;
    }

    current.animate(100, 3000, Easing.linear);
  };

  const handleBackwardProgress = () => {
    const { current } = progressRef;

    if (!current) {
      return;
    }

    current.animate(0, 3000, Easing.linear);
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

      <View style={{ alignItems: "center" }}>
        <AnimatedCircularProgress
          ref={progressRef}
          size={150}
          width={5}
          backgroundWidth={15}
          padding={10}
          fill={0}
          tintColor="turquoise"
          tintColorSecondary="#c93103"
          lineCap="round"
          // renderCap={({ center }) => (
          //   <Circle cx={center.x} cy={center.y} r="10" fill="cyan" />
          // )}
          onAnimationComplete={() => {
            console.log("onAnimationComplete");
          }}
          backgroundColor="#211eaa"
          arcSweepAngle={300}
          rotation={210}
        >
          {(fill) => <Text>{Math.round(fill)}</Text>}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.buttonsContainer}>
          <Button
            color="green"
            title="Forward animation"
            onPress={handleForvardProgress}
          />
          <Button
            color="red"
            title="Backward animation"
            onPress={handleBackwardProgress}
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
});

export default MQTTScreen;
