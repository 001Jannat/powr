import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { OtpVerification } from 'react-native-powr-auth';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Text,Box, Card } from '@gluestack-ui/themed';
export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <View style={styles.container}>
        <Box
          bg="#64748B33"
          py="$2"
          px="$6"
          mb="$4"
          rounded="$full"
          alignItems="center"
          marginTop={18}
          $base-flexDirection="column"
          $sm-flexDirection="row"
          $md-alignSelf="flex-start"
        >
          <Text color="$black" fontWeight="$bold" size="2xl">
            L O G I N
          </Text>
        </Box>
        <Card maxHeight={450} maxWidth={450} p="$5" borderRadius="$lg" m="$2">
          <OtpVerification />
          </Card>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>Terms of Use and Privacy Policy</Text>
        </View>
      </View>
    </GluestackUIProvider>
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
