//import liraries
import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import Colors from '../../theme/colors';
import {screenHeight, screenWidth} from '../../utils/constants';
import {CloseCircle, TickCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

// create a component
const CustomModal = ({visible, closeModal, status, message}) => {
  const navigation = useNavigation();
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.body}>
          {status ? (
            <TickCircle size={80} color={Colors.Color1} />
          ) : (
            <CloseCircle size={80} color={Colors.Color4} />
          )}
          {/* Başarı simgesi */}
          <Text style={styles.title}>{status ? 'Success!' : 'Error!'}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              {
                <Text style={styles.buttonText}>
                  {status ? 'Okay' : 'Try Again'}
                </Text>
              }
            </TouchableOpacity>
            {!status && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Yarı saydam arka plan
  },
  body: {
    backgroundColor: Colors.WHITE,
    width: screenWidth * 0.85,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginTop: 15,
  },
  message: {
    fontSize: 16,
    color: Colors.TEXT,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.Color1,
    paddingVertical: 15,
    borderRadius: 8,
    shadowColor: Colors.SUCCESS,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: '600',
  },
});

//make this component available to the app
export default CustomModal;
