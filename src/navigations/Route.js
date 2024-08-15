import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();

const Route = () => {
  const isLogin = useSelector(state => state.userData?.userData);
  console.log(isLogin,'route');
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLogin ? MainStack() : AuthStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;