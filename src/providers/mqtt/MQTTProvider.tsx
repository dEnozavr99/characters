import React, { PropsWithChildren, useEffect, useState } from "react";

import MqttClient, {
  ClientEvent,
  ConnectEventHandler,
  DisconnectEventHandler,
} from "@ko-developerhong/react-native-mqtt";

import { MQTTContext } from "../../contexts/mqtt";

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [clientNext] = useState<typeof MqttClient>(MqttClient);
  const [isClientConnected, setIsClientConnected] = useState(false);

  useEffect(() => {
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

    return () => {
      clientNext.off(ClientEvent.Connect, connectEventHandler);
      clientNext.off(ClientEvent.Disconnect, disconnectEventHandler);
    };
  });

  return (
    <MQTTContext.Provider
      value={{ client: clientNext, isConnected: isClientConnected }}
    >
      {children}
    </MQTTContext.Provider>
  );
};
