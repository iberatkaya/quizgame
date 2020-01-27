import React, { Component } from 'react'
import { Text, View } from 'react-native';
import AppNav from './AppNav';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './screens/Reducer';

const store = createStore(reducer);


export class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <AppNav/>
      </Provider>
    )
  }
}

export default App
