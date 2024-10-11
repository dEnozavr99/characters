import { ConnectionOptions } from "@ko-developerhong/react-native-mqtt";

const BROKER = "mqtt://broker.hivemq.com";
const CLIENT_ID = "perfect-politician.cloudmqtt.com";
const USERNAME = "gelphadi";
const PASSWORD = "oYMgWJETz_0N";

const CONNECTION_OPTIONS: ConnectionOptions = {
  clientId: CLIENT_ID,
  username: USERNAME,
  password: PASSWORD,
  maxInFlightMessages: 1,
  // cleanSession: true,
  // keepAlive: 60,
  // timeout: 60,
  // autoReconnect: true,
  // allowUntrustedCA: true,
  // enableSsl: true,
  // protocol: "mqtts",
};

const TOPIC_IN = "esp32/test_in";

export { BROKER, CONNECTION_OPTIONS, TOPIC_IN };
