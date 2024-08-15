import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imagePath from '../../constants/imagePath';
import { moderateScale, textScale } from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import TextInputComp from '../../Components/TextInputComp';
import CustomBtn from '../../Components/CustomBtn';
import navigationsStrings from '../../constants/navigationsStrings';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/userAuth';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const handleSignup = async () => {
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    try {
      // Save user data in AsyncStorage
      const userData = { name, email, password };
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      // Log the signup details to the terminal
      console.log('Signup Details:');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);

      // Dispatch login action
      dispatch(login(true));

      // Optionally, navigate to another screen or show an alert
      Alert.alert('Signup Successful!');
      navigation.navigate(navigationsStrings.SIGNIN); // Navigate to the sign-in screen or wherever appropriate
    } catch (error) {
      console.error('Error signing up', error);
      Alert.alert('Error signing up. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.themebackgroundcolor }}>
      <View style={{ flex: 1, backgroundColor: colors.themebackgroundcolor, marginHorizontal: moderateScale(14) }}>
        <ScrollView bounces={false}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.gobackImageStyle}
              source={imagePath.goBackArrow}
            />
          </TouchableOpacity>
          <View style={styles.containView}>
            <Text style={styles.welcomeTextStyle}>Welcome Onboard!</Text>
            <Text style={styles.letTextStyle}>
              Let’s help you meet up your task
            </Text>
            <View style={{ marginTop: moderateScale(52), alignItems: 'center' }}>
              <TextInputComp
                placeholder={'Enter your Full Name'}
                onChangeText={text => setName(text)}
                value={name}
              />
              <TextInputComp
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder={'Enter your Email address '}
                keyboardType="email-address"
              />
              <TextInputComp
                placeholder={'Create a Password'}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
              />
              <TextInputComp
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                placeholder={'Confirm your Password'}
                secureTextEntry
              />
              <CustomBtn
                onpress={handleSignup}
                btnStyle={{ marginTop: moderateScale(98) }}
                btnText={'Sign Up '}
              />
              <Text style={styles.redyText}>
                Already have an account?{' '}
                <Text
                  style={styles.signinText}
                  onPress={() => navigation.navigate(navigationsStrings.SIGNIN)}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  gobackImageStyle: {
    height: moderateScale(26),
    width: moderateScale(34),
  },
  welcomeTextStyle: {
    fontSize: textScale(20),
    fontWeight: '500',
    color: colors.black,
  },
  containView: {
    alignItems: 'center',
    marginTop: moderateScale(80),
  },
  letTextStyle: {
    fontSize: textScale(13),
    color: colors.btnColor,
    marginTop: moderateScale(20),
  },
  redyText: {
    fontSize: textScale(15),
    marginTop: moderateScale(32),
  },
  signinText: {
    fontSize: textScale(15),
    color: colors.btnColor,
    fontWeight: '500',
  },
});
