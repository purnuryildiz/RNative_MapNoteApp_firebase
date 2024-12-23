import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../../theme/colors';
import {SIGNIN, SIGNUP} from '../../utils/routes';
import {screenHeight, screenWidth} from '../../utils/constants';

const Launch = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* Lottie Animation */}
        <View style={styles.animationView}>
          <LottieView
            source={require('../../assets/animations/launch.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Map Note</Text>
          <Text style={styles.subtitle}>
            Map your way to a more organized life. Plan better, achieve more.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate(SIGNIN)}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate(SIGNUP)}>
            <Text style={styles.secondaryButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  animationView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  animation: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.TITLE,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: Colors.SUBTITLE,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    width: screenWidth * 0.8,
    paddingVertical: 16,
    backgroundColor: Colors.BUTTON,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  secondaryButton: {
    width: screenWidth * 0.8,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: Colors.BUTTON,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  secondaryButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BUTTON,
  },
});

export default Launch;
