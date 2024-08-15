import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationsStrings from '../constants/navigationsStrings';
import {Onboarding, Signin, Signup} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <Stack.Screen
        name={navigationsStrings.ONBOARDING}
        component={Onboarding}
      />
      <Stack.Screen name={navigationsStrings.SIGNUP} component={Signup} />
      <Stack.Screen name={navigationsStrings.SIGNIN} component={Signin} />
    </>
  );
};

export default AuthStack;