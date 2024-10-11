import { ConnectionOptions } from "@ko-developerhong/react-native-mqtt";

// const MQTT_PORT = "1883";

// const BROKER = `mqtt://perfect-politician.cloudmqtt.com:${MQTT_PORT}`;
const BROKER = `test.mosquitto.org`;

const CLIENT_ID = "react_native_client";

// const USERNAME = "gelphadi";
// const PASSWORD = "oYMgWJETz_0N";

const CONNECTION_OPTIONS: ConnectionOptions = {
  clientId: CLIENT_ID,
  // username: USERNAME,
  // password: PASSWORD,
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
