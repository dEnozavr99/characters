import { useEffect, useState } from "react";
import { useMQTTClient } from "../../hooks";

import { BROKER, CONNECTION_OPTIONS } from "./constant";
import { ClientEvent } from "@ko-developerhong/react-native-mqtt";
import type {
  ErrorEventHandler,
  MessageEventHandler,
} from "@ko-developerhong/react-native-mqtt";

type MessageData = {
  topic: string;
  message: string;
};

const MQTT_IN_TOPIC = "rn/test";
const MQTT_OUT_TOPIC = "rn/test";

const MESSAGE = "Hello from RN";

export const useMQTTConnection = () => {
  const { client, isConnected } = useMQTTClient();
  const [currentData, setCurrentData] = useState<MessageData>({
    topic: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      const messageEventHandler: MessageEventHandler = (topic, message) => {
        const newData = { topic, message: message.toString() };

        console.log("TOPIC", newData.topic);
        console.log("MESSAGE", newData.message);

        setCurrentData(newData);
      };

      client.on(ClientEvent.Message, messageEventHandler);

      const errorEventHandler: ErrorEventHandler = (error) => {
        console.log("ERROR", error);

        setErrorMessage(error);
      };

      client.on(ClientEvent.Error, errorEventHandler);

      return () => {
        client.off(ClientEvent.Message, messageEventHandler);
        client.off(ClientEvent.Error, errorEventHandler);
      };
    } catch (error) {
      console.error("initialize listeners error " + error);
    }
  }, [client]);

  const handleDisconnect = () => {
    try {
      client.disconnect();
    } catch (error) {
      console.error("handleDisconnect" + error);
    }
  };

  const handleConnect = () => {
    handleDisconnect();

    client
      .connect(BROKER, CONNECTION_OPTIONS)
      .then(() => {
        console.log("Connected");
      })
      .catch((error) => {
        console.error("handleConnect" + error);
      });
  };

  const handleSubscribe = () => {
    try {
      client.subscribe(MQTT_IN_TOPIC);

      console.log("SUBSCRIBED", MQTT_IN_TOPIC);
    } catch (error) {
      console.error("handleSubscribe error + " + error);
    }
  };

  const handleUnsubscribe = () => {
    try {
      client.unsubscribe([MQTT_IN_TOPIC]);

      console.log("UNSUBSCRIBED", MQTT_IN_TOPIC);
    } catch (error) {
      console.error("handleUnsubscribe error + " + error);
    }
  };

  const handlePublish = () => {
    try {
      client.publish(MQTT_OUT_TOPIC, MESSAGE);

      console.log("PUBLISHED", MQTT_OUT_TOPIC, MESSAGE);
    } catch (error) {
      console.error("handlePublish error + " + error);
    }
  };

  return {
    isClientConnected: isConnected,
    currentData,
    errorMessage,
    handleConnect,
    handleDisconnect,
    handleSubscribe,
    handleUnsubscribe,
    handlePublish,
  };
};
