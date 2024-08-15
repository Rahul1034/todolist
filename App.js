import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import Route from './src/navigations/Route';
import store from './src/redux/store';

if (__DEV__) {
  require('./ReactotronConfig');
}

const App = () => {
  return (
    <Provider store={store}>
    <View style={{flex: 1}}>
      <Route />
    </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});