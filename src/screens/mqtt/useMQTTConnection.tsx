import { useEffect, useState } from "react";
import { useMQTTClient } from "../../hooks";

import { BROKER, CONNECTION_OPTIONS } from "./constant";
import { ClientEvent } from "@ko-developerhong/react-native-mqtt";
import type {
  ConnectEventHandler,
  DisconnectEventHandler,
  ErrorEventHandler,
  MessageEventHandler,
} from "@ko-developerhong/react-native-mqtt";

type MessageData = {
  topic: string;
  message: string;
};

const MQTT_IN_TOPIC = "esp32/test_in";
const MQTT_OUT_TOPIC = "esp32/test_out";
// const MQTT_IN_TOPIC = "rn/test_in";
// const MQTT_OUT_TOPIC = "rn/test_out";

export const useMQTTConnection = () => {
  const { client } = useMQTTClient();

  const [isClientConnected, setIsClientConnected] = useState(false);
  const [currentData, setCurrentData] = useState<MessageData>({
    topic: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      const connectEventHandler: ConnectEventHandler = (reconnect) => {
        console.log("IS RECONNECT", reconnect);

        setIsClientConnected(true);
      };

      client.on(ClientEvent.Connect, connectEventHandler);

      const disconnectEventHandler: DisconnectEventHandler = (cause) => {
        console.log("DISCONNECT CAUSE", cause);

        setIsClientConnected(false);
      };

      client.on(ClientEvent.Disconnect, disconnectEventHandler);

      const messageEventHandler: MessageEventHandler = (topic, message) => {
        console.log("TOPIC", topic);
        console.log("MESSAGE", message.toString());

        setCurrentData({ topic, message: message.toString() });
      };

      client.on(ClientEvent.Message, messageEventHandler);

      const errorEventHandler: ErrorEventHandler = (error) => {
        console.log("ERROR", error);

        setErrorMessage(error);
      };

      client.on(ClientEvent.Error, errorEventHandler);

      return () => {
        console.log("CLEANUP");

        client.off(ClientEvent.Connect, connectEventHandler);
        client.off(ClientEvent.Disconnect, disconnectEventHandler);
        client.off(ClientEvent.Message, messageEventHandler);
        client.off(ClientEvent.Error, errorEventHandler);
      };
    } catch (error) {
      console.error("initialize listeners error " + error);
    }
  }, [client]);

  const handleDisconnect = () => {
    console.log("handleDisconnect");

    try {
      client.disconnect();
    } catch (error) {
      console.error("handleDisconnect" + error);
    }
  };

  const handleConnect = () => {
    // handleDisconnect();

    console.log("handleConnect");

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
    } catch (error) {
      console.error("handleSubscribe error + " + error);
    }
  };

  const handlePublish = () => {
    try {
      client.publish(MQTT_OUT_TOPIC, "Hello");
    } catch (error) {
      console.error("handlePublish error + " + error);
    }
  };

  return {
    isClientConnected,
    currentData,
    errorMessage,
    handleConnect,
    handleDisconnect,
    handleSubscribe,
    handlePublish,
  };
};
