import { useCallback } from "react";

import { useMQTTClient } from "..";

import { BROKER, CONNECTION_OPTIONS } from "./constant";

const MQTT_IN_TOPIC = "rn/temperature";
const MQTT_OUT_TOPIC = "rn/test";

const MOCKED_MESSAGE = "Hello from RN";

export const useMQTTConnection = () => {
  const { client, isConnected } = useMQTTClient();

  const handleDisconnect = useCallback(() => {
    try {
      client.disconnect();
    } catch (error) {
      console.error("handleDisconnect" + error);
    }
  }, [client]);

  const handleConnect = useCallback(() => {
    handleDisconnect();

    client
      .connect(BROKER, CONNECTION_OPTIONS)
      .then(() => {
        console.log("Connected");
      })
      .catch((error) => {
        console.error("handleConnect" + error);
      });
  }, [client, handleDisconnect]);

  const handleSubscribe = useCallback(() => {
    if (!isConnected) {
      return;
    }

    try {
      client.subscribe(MQTT_IN_TOPIC);

      console.log("SUBSCRIBED", MQTT_IN_TOPIC);
    } catch (error) {
      console.error("handleSubscribe error + " + error);
    }
  }, [client, isConnected]);

  const handleUnsubscribe = useCallback(() => {
    if (!isConnected) {
      return;
    }

    try {
      client.unsubscribe([MQTT_IN_TOPIC]);

      console.log("UNSUBSCRIBED", MQTT_IN_TOPIC);
    } catch (error) {
      console.error("handleUnsubscribe error + " + error);
    }
  }, [client, isConnected]);

  const handlePublish = useCallback(() => {
    if (!isConnected) {
      return;
    }

    try {
      client.publish(MQTT_OUT_TOPIC, MOCKED_MESSAGE);

      console.log("PUBLISHED", MQTT_OUT_TOPIC, MOCKED_MESSAGE);
    } catch (error) {
      console.error("handlePublish error + " + error);
    }
  }, [client, isConnected]);

  return {
    isClientConnected: isConnected,
    handleConnect,
    handleDisconnect,
    handleSubscribe,
    handleUnsubscribe,
    handlePublish,
  };
};
