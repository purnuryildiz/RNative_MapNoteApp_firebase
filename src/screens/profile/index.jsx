//import libraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {User, Edit, Logout} from 'iconsax-react-native';
import Colors from '../../theme/colors';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        firestore()
          .collection('Users')
          .doc(value)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              setUserInfo(documentSnapshot.data());
            }
          });
      }
    } catch (e) {
      console.error('Error fetching user data:', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/images/profile.jpeg')}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>{userInfo?.name || 'User Name'}</Text>
        <Text style={styles.profileEmail}>
          {userInfo?.email || 'user@example.com'}
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {/* Edit Profile */}
        <TouchableOpacity style={styles.option}>
          <Edit size={24} color={Colors.Color1} />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Account Settings */}
        <TouchableOpacity style={styles.option}>
          <User size={24} color={Colors.Color1} />
          <Text style={styles.optionText}>Account Settings</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.option}>
          <Logout size={24} color={Colors.Color1} />
          <Text style={[styles.optionText, {color: Colors.DANGER}]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingTop: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    elevation: 5, // Sadece View'da çalışır
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: '#fff', // Gölge için arka plan gerekli
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 124, // Kenarlık için biraz küçültüldü
    height: 124,
    borderRadius: 62,
    borderWidth: 3,
    borderColor: Colors.Color2,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 3,
  },
  profileEmail: {
    fontSize: 14,
  },
  optionsContainer: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 16,
    color: Colors.TEXT_PRIMARY,
    fontWeight: '600',
    marginLeft: 10,
  },
});

//make this component available to the app
export default Profile;
