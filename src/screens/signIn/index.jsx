import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {Formik} from 'formik';
import {Input} from '@ui-kitten/components';
import {SignInSchema} from '../../utils/schemas';
import Colors from '../../theme/colors';
import {screenWidth} from '../../utils/constants';
import {SIGNUP} from '../../utils/routes';
import auth from '@react-native-firebase/auth';
import CustomModal from '../../components/ui/customModal';

const SignIn = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(false); // Success or error
  const [modalMessage, setModalMessage] = useState(''); // Modal message content
  const fadeAnim = new Animated.Value(0);

  const signInUser = values => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setStatus(true);
        setModalMessage('Successfully signed in!');
        console.log('User signed in!');
      })
      .catch(error => {
        setStatus(false);
        setModalMessage(
          'The email address you entered is not registered. Please check your credentials or sign up to create a new account.',
        );
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setVisible(true); // Show the modal
      });
  };

  // Fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <CustomModal
          visible={visible}
          status={status}
          message={modalMessage}
          closeModal={() => {
            setVisible(false);
            if (status) {
              navigation.navigate('Home'); // Navigate to Home or desired screen
            }
          }}
        />
        <Formik
          initialValues={{
            email: 'purnuryildiz17@gmail.com',
            password: '12345678',
          }}
          validationSchema={SignInSchema}
          onSubmit={values => signInUser(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <Animated.View style={[styles.formContainer, {opacity: fadeAnim}]}>
              <Text style={styles.headerText}>Welcome Back!</Text>

              {/* Email Input */}
              <Input
                status={errors.email ? 'danger' : 'basic'}
                caption={errors.email}
                style={styles.input}
                value={values.email}
                autoCapitalize="none"
                label="Email"
                placeholder="Enter your email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />

              {/* Password Input */}
              <Input
                status={errors.password ? 'danger' : 'basic'}
                caption={errors.password}
                style={styles.input}
                value={values.password}
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonLoading]}
                onPress={handleSubmit}
                disabled={loading}>
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Sign-Up Navigation */}
              <TouchableOpacity onPress={() => navigation.navigate(SIGNUP)}>
                <Text style={styles.secondaryButtonText}>
                  Don't have an account? Sign up
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'linear-gradient(45deg, #ff9a9e, #fad0c4)', // Gradient background
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.HEADER_TEXT,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Helvetica Neue', // Sleek font
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Translucent background
  },
  input: {
    marginVertical: 15,
    width: screenWidth * 0.85,
    borderRadius: 15,
    backgroundColor: Colors.INPUT_BACKGROUND,
    fontSize: 16,
    paddingLeft: 40, // To fit the icon properly
  },
  icon: {
    fontSize: 20,
    color: Colors.ICON_COLOR,
    marginLeft: 10,
  },
  primaryButton: {
    width: screenWidth * 0.85,
    paddingVertical: 18,
    backgroundColor: Colors.BUTTON,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonLoading: {
    backgroundColor: Colors.BUTTON_DISABLED,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryButtonText: {
    fontSize: 14,
    color: Colors.LINK,
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SignIn;
