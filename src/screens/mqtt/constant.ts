import { ConnectionOptions } from "@ko-developerhong/react-native-mqtt";

// const MQTT_PORT = "1883";

const BROKER = "perfect-politician.cloudmqtt.com";
// const BROKER = "broker.hivemq.com";
// const BROKER = "mqtts://test.mosquitto.org:8883";

// const CLIENT_ID = "esp32_client";
const CLIENT_ID = "react_native_client";

const USERNAME = "gelphadi";
const PASSWORD = "oYMgWJETz_0N";

// const USERNAME = "tablet";
// const PASSWORD = "password";

const CONNECTION_OPTIONS: ConnectionOptions = {
  clientId: CLIENT_ID,
  username: USERNAME,
  password: PASSWORD,
  // autoReconnect: false,
  // cleanSession: true,
  // keepAlive: 60,
  // timeout: 60,
  // maxInFlightMessages: 1,
  // tls: {
  //   caDer: Buffer.from('myCertificate'),
  //   cert: 'myCertificate',
  //   key: 'myKey',
  //   p12: Buffer.from('myP12'),
  //   pass: 'myPass',
  // },
  // allowUntrustedCA: true,
  // enableSsl: true,
};

const TOPIC_IN = "esp32/test_in";

export { BROKER, CONNECTION_OPTIONS, TOPIC_IN };
