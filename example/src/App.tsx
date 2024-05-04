import * as React from 'react';
import { StyleSheet, View, Dimensions,Text } from 'react-native';
import { OtpVerification } from 'react-native-powr-auth';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <OtpVerification />
      </View>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>Terms of Use and Privacy Policy</Text>
      </View>
    
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const containerWidth = width * 0.9;
const containerHeight = height * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
     backgroundColor: '#ECEFF1',
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  termsContainer: {
    position: 'absolute',
    bottom: 20,
  },
  termsText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
  },
  innerContainer: {
    width: containerWidth,
    height: containerHeight,
    backgroundColor: 'white', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
