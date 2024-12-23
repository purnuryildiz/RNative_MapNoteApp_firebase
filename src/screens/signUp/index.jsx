import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {Input} from '@ui-kitten/components';
import {SignUpSchema} from '../../utils/schemas';
import Colors from '../../theme/colors';
import {screenWidth} from '../../utils/constants';
import auth from '@react-native-firebase/auth';
import CustomModal from '../../components/ui/customModal';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(false);
  const createUser = (values, userId) => {
    setLoading(true);
    firestore()
      .collection('Users')
      .doc(userId)
      .set(values)
      .then(() => {
        setStatus(true);
      })
      .catch(error => {
        console.log(error);
        setStatus(false);
      })
      .finally(() => {
        setVisible(true);
        setLoading(false);
      });
  };

  const signUpUser = values => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(data => {
        setStatus(true);
        createUser(values, data.user.uid);
        console.log('User account created & signed in!');
      })
      .catch(error => {
        setStatus(false);
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
      })
      .finally(() => {
        setLoading(false);
        setVisible(true);
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <CustomModal
          visible={visible}
          status={status}
          message={
            status
              ? 'Your account has been created successfully.'
              : 'That email adress is already in usage!'
          }
          closeModal={() => {
            setVisible(false);
            navigation.goBack();
          }}
        />
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={values => signUpUser(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={styles.formContainer}>
              <Text style={styles.headerText}>Create a New Account</Text>

              {/* Full Name Input */}
              <Input
                status={errors.name ? 'danger' : 'basic'}
                caption={errors.name}
                style={styles.input}
                value={values.name}
                autoCapitalize="words"
                label="Full Name"
                placeholder="Enter your full name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />

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

              {/* Display error message */}
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonLoading]}
                onPress={handleSubmit}
                disabled={loading}>
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>

              {/* Sign-In Navigation */}
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.secondaryButtonText}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: Colors.BACKGROUND,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.HEADER_TEXT,
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  input: {
    marginVertical: 15,
    width: screenWidth * 0.85,
    borderRadius: 15,
    backgroundColor: Colors.INPUT_BACKGROUND,
    fontSize: 16,
  },
  primaryButton: {
    width: screenWidth * 0.85,
    paddingVertical: 18,
    backgroundColor: Colors.BUTTON,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
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
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SignUp;
