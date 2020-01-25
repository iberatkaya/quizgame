import React, { Component } from 'react'
import { Text, View } from 'react-native';
import AppNav from './AppNav';
import 'react-native-gesture-handler';

export class App extends Component {
  render() {
    return (
      <AppNav/>
    )
  }
}

export default App
