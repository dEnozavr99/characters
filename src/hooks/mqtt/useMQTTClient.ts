import { useContext } from "react";

import { MQTTContext } from "../../contexts";
import type { State } from "../../contexts";

export const useMQTTClient = (): State => {
  const state = useContext(MQTTContext);

  if (!state) {
    throw new Error("useMQTTClient should be used within the MQTTProvider");
  }

  return state;
};
