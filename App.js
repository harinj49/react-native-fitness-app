import React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';



export default function App() {
  return (
    <Provider store={createStore(reducers)}>
      <View>
        <AddEntry />
      </View>
    </Provider>
  );
}

