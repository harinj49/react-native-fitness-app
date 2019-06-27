import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import AddEntry from './components/AddEntry';
import History from './components/History';



export default function App() {
  return (
    <Provider store={createStore(reducers)}>
      <View style={{flex:1}}>
        <View style={{height:20}}></View>
        <History />
      </View>
    </Provider>
  );
}

