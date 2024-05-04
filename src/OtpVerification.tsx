import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import OTPTextView from 'react-native-otp-textinput';

export default function OtpVerification() {
  const [countryCode, setCountryCode] = useState<string | undefined>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [country, setCountry] = useState<any>(null);
  const [receivedVerificationCode, setReceivedVerificationCode] = useState<string>('');
  const [isVerificationSuccessful, setIsVerificationSuccessful] = useState<boolean>(false);

  const fetchOtp = async () => {
    console.log("fetch")
    try {
      const response = await axios.get('http://192.168.43.155:3000/getotp');
      console.log(response,"res")
      console.log(response.data,"data")
      const receivedCode = response.data.verificationCode;
      console.log(receivedCode, "received code");
      if (receivedCode) {
        setReceivedVerificationCode(receivedCode);
        setIsVerificationSuccessful(false);
      } else {
        Alert.alert('Error', 'Failed to receive verification code.');
      }
    } catch (error) {
      console.log(error, "error");
      Alert.alert('Error', 'Failed to fetch verification code. Please try again.');
    }
  }

  const handleVerifyCode = async () => {
    try {
      console.log(phoneNumber,"num");
      console.log(verificationCode,"code ");
      const values = { phoneNumber:phoneNumber, verificationCode:verificationCode }
      const response = await axios.post('http://192.168.43.155:3000/verifyOtp',values);
      console.log(response,"status")
      if (response.status === 200) {
        setIsVerificationSuccessful(true);
        Alert.alert('Verification Successful', 'Phone number verified successfully.');
        setReceivedVerificationCode(''); 
      } else {
        Alert.alert('Error', 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {!isVerificationSuccessful && (
        <>
          {!receivedVerificationCode && (
            <>
              <View style={styles.mainText}>
                <Text style={styles.boldText}>Enter Your Phone Number</Text>
                <Text> We will send you a verification code</Text>
              </View>
              <View style={styles.inputContainer}>
                <CountryPicker
                  withFilter
                  withFlag
                  withCallingCodeButton
                  withAlphaFilter
                  withCallingCode
                  withEmoji
                  onSelect={(selectedCountry: any) => {
                    setCountry(selectedCountry);
                    setCountryCode(selectedCountry.callingCode[0]);
                  }}
                  countryCode={country?.cca2 || 'US'}
                  translation="common"
                />
                <TextInput
                  style={styles.phoneNumberInput}
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title=" Verify "
                  onPress={fetchOtp}
                  color="#0AB39C"
                />
              </View>
            </>
          )}
          {receivedVerificationCode && (
            <View style={styles.verificationContainer}>
              <Text style={styles.boldText2}>Enter OTP</Text>
              <Text>We have sent a verification code to </Text>
              <Text style={styles.boldText3}>+{countryCode} {phoneNumber}</Text>
              <OTPTextView
                handleTextChange={(code: any) => setVerificationCode(code)}
                keyboardType="numeric"
                textInputStyle={styles.otpInput}
                inputCount={6}
              />
              <View style={styles.buttonContainer1}>
                <Button
                  title="Submit"
                  onPress={handleVerifyCode}
                  color="#0AB39C"
                />
              </View>
              <View>
                <Text >Don't receive OTP?</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.resendText}>Resend OTP </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
      {isVerificationSuccessful && (
        
        <Text style={styles.successMessage}>Verification successful!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    // backgroundColor: '#ECEFF1',
  },
  mainText: {
    marginBottom: 30,
    color: '#495057'
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:10
  },
  boldText3: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom:10
  },
  boldText2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#495057'
  },
  phoneNumberInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonContainer: {
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 28,
    paddingHorizontal: 10,
    width: '80%',
  },
  otpInput: {
    width: 30,
    height: 30,
    fontSize: 16,
    margin: 5,
  },
  resendText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0AB39C',
    textAlign:'center'
  },
  verificationContainer: {
    alignItems: 'center',
  },
  successMessage: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'green',
  }
});
