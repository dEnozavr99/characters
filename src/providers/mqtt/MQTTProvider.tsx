import React, { PropsWithChildren, useEffect, useState } from "react";

import MqttClient, { ClientEvent } from "@ko-developerhong/react-native-mqtt";

import { BROKER, CONNECTION_OPTIONS, TOPIC_IN } from "./constant";

import { MQTTContext } from "../../contexts/mqtt";

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [clientNext] = useState<typeof MqttClient>(MqttClient);
  const [isClientInitialized, setIsClientInitialized] = useState(false);

  useEffect(() => {
    const initializeMqttClient = async () => {
      try {
        if (isClientInitialized) {
          console.log("CLIENT IS ALREADY INITIALIZED");

          return;
        }

        MqttClient.disconnect();

        const isConnected = await MqttClient.connect(
          BROKER,
          CONNECTION_OPTIONS
        );

        if (!isConnected) {
          console.log("CLIENT IS NOT CONNECTED");

          return;
        }

        MqttClient.on(ClientEvent.Connect, (reconnect) => {
          console.log("CONNECTED");
          console.log("IS RECONNECT", reconnect);

          setIsClientInitialized(true);

          MqttClient.subscribe(TOPIC_IN, 1);
        });

        MqttClient.on(ClientEvent.Message, (topic, message) => {
          console.log("TOPIC", topic);
          console.log("MESSAGE", message);
        });
      } catch (error) {
        console.error("initializeMqttClient " + error);
      }
    };

    initializeMqttClient();
  }, [isClientInitialized]);

  return (
    <MQTTContext.Provider value={{ client: clientNext }}>
      {children}
    </MQTTContext.Provider>
  );
};
