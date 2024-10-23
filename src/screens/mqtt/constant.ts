import { ConnectionOptions } from "@ko-developerhong/react-native-mqtt";

import { MQTT_BROKER, MQTT_USERNAME, MQTT_PASSWORD } from "@env";

const BROKER = MQTT_BROKER;

const CLIENT_ID = "react_native_client";

const CONNECTION_OPTIONS: ConnectionOptions = {
  clientId: CLIENT_ID,
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  // keepAlive: 60,
  // autoReconnect: true,
  // protocol: "mqtt",
  // allowUntrustedCA: true,
  // maxInFlightMessages: 5,
  // cleanSession: true,
  // timeout: 60,
  // tls: {
  //   caDer: Buffer.from('myCertificate'),
  //   cert: 'myCertificate',
  //   key: 'myKey',
  //   p12: Buffer.from('myP12'),
  //   pass: 'myPass',
  // },
  // enableSsl: true,
};

export { BROKER, CONNECTION_OPTIONS };
