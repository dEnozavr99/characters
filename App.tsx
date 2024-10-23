/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { MQTTProvider } from "./src/providers/mqtt";

import { RootNavigator } from "./src/navigators";

global.Buffer = require("buffer").Buffer;

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MQTTProvider>
        <RootNavigator />
      </MQTTProvider>
    </NavigationContainer>
  );
}

export default App;
