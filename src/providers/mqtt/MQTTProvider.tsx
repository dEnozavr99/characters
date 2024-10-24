import React, { PropsWithChildren, useEffect, useState } from "react";

import MqttClient, {
  ClientEvent,
  ConnectEventHandler,
  DisconnectEventHandler,
  ErrorEventHandler,
  MessageEventHandler,
} from "@ko-developerhong/react-native-mqtt";

import { MQTTContext } from "../../contexts/mqtt";

import type { MessageData } from "../../contexts";

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [clientNext] = useState<typeof MqttClient>(MqttClient);
  const [isClientConnected, setIsClientConnected] = useState(false);
  const [currentData, setCurrentData] = useState<MessageData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      const connectEventHandler: ConnectEventHandler = (reconnect) => {
        console.log("IS RECONNECT", reconnect);

        setIsClientConnected(true);
      };

      clientNext.on(ClientEvent.Connect, connectEventHandler);

      const disconnectEventHandler: DisconnectEventHandler = (cause) => {
        console.log("DISCONNECT CAUSE", cause);

        setIsClientConnected(false);
      };

      clientNext.on(ClientEvent.Disconnect, disconnectEventHandler);

      const messageEventHandler: MessageEventHandler = (topic, message) => {
        const newData = { topic, message: message.toString() };

        console.log("TOPIC", newData.topic);
        console.log("MESSAGE", newData.message);

        setCurrentData(newData);
      };

      clientNext.on(ClientEvent.Message, messageEventHandler);

      const errorEventHandler: ErrorEventHandler = (error) => {
        console.log("ERROR", error);

        setErrorMessage(error);
      };

      clientNext.on(ClientEvent.Error, errorEventHandler);

      return () => {
        clientNext.off(ClientEvent.Connect, connectEventHandler);
        clientNext.off(ClientEvent.Disconnect, disconnectEventHandler);
        clientNext.off(ClientEvent.Message, messageEventHandler);
        clientNext.off(ClientEvent.Error, errorEventHandler);
      };
    } catch (error) {
      console.error("initialize mqtt error" + error);
    }
  });

  return (
    <MQTTContext.Provider
      value={{
        client: clientNext,
        isConnected: isClientConnected,
        data: currentData,
        errorMessage,
      }}
    >
      {children}
    </MQTTContext.Provider>
  );
};
