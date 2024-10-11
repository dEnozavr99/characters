import { Button, View, Text, StyleSheet } from "react-native";
import React from "react";

const MQTTScreen = () => {
  return (
    <View style={style.container}>
      <Text>MQTTScreen</Text>
      <Button title="Publish" />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MQTTScreen;
