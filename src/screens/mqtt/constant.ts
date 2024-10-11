import { ConnectionOptions } from "@ko-developerhong/react-native-mqtt";

const MQTT_PORT = "1883";

const BROKER = `mqtt://perfect-politician.cloudmqtt.com:${MQTT_PORT}`;

const CLIENT_ID = "react_native_client";

const USERNAME = "gelphadi";
const PASSWORD = "oYMgWJETz_0N";

const CONNECTION_OPTIONS: ConnectionOptions = {
  clientId: CLIENT_ID,
  username: USERNAME,
  password: PASSWORD,
  // protocol: "mqtt",
  // allowUntrustedCA: true,
  // keepAlive: 60,
  // maxInFlightMessages: 5,
  // autoReconnect: false,
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
