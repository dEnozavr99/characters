import { createContext } from "react";
import MqttClient from "@ko-developerhong/react-native-mqtt";

export type State = {
  client: typeof MqttClient;
};

export const MQTTContext = createContext<State | null>(null);
