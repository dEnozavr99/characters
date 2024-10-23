import { createContext } from "react";
import MqttClient from "@ko-developerhong/react-native-mqtt";

export type MessageData = {
  topic: string;
  message: string;
};

export type State = {
  client: typeof MqttClient;
  isConnected: boolean;
  data: MessageData | null;
  errorMessage: string;
};

export const MQTTContext = createContext<State | null>(null);
