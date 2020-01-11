import React from "react";
import Setup from "./src/boot/setup";
import { NativeModules } from 'react-native';
const SharedStorage = NativeModules.SharedStorage;

export default class App extends React.Component {
  componentDidMount(): void {
    SharedStorage.set(
      JSON.stringify({text: 'This is data from the React Native app'})
    );
  }

  render() {
    return <Setup />;
  }
}
