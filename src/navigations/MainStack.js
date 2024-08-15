import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationsStrings from '../constants/navigationsStrings';
import {AddToList, TodoTask} from '../screens';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
      <Stack.Screen name={navigationsStrings.ADDTOLIST} component={AddToList} />
      <Stack.Screen name={navigationsStrings.TODOTASK} component={TodoTask} />
    </>
  );
};

export default MainStack;