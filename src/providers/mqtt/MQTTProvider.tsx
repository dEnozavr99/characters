import React, { PropsWithChildren, useState } from "react";

import MqttClient from "@ko-developerhong/react-native-mqtt";

import { MQTTContext } from "../../contexts/mqtt";

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [clientNext] = useState<typeof MqttClient>(MqttClient);

  return (
    <MQTTContext.Provider value={{ client: clientNext }}>
      {children}
    </MQTTContext.Provider>
  );
};
