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

        const result = await MqttClient.connect(BROKER, CONNECTION_OPTIONS);
        console.log("CONNECTION RESULT", result);

        MqttClient.on(ClientEvent.Connect, (reconnect) => {
          console.log("CONNECTED");
          console.log("IS RECONNECT", reconnect);

          MqttClient.subscribe(TOPIC_IN);

          MqttClient.on(ClientEvent.Message, (topic, message) => {
            console.log("TOPIC", topic);
            console.log("MESSAGE", message);
          });

          setIsClientInitialized(true);
        });
      } catch (error) {
        console.error("initializeMqttClient " + error);
      }
    };

    initializeMqttClient();

    return () => {
      console.log("CONTEXT CLEANUP");

      MqttClient.disconnect();
    };
  }, [isClientInitialized]);

  return (
    <MQTTContext.Provider value={{ client: clientNext }}>
      {children}
    </MQTTContext.Provider>
  );
};
