import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADDNOTE,
  LAUNCH,
  MAP,
  NOTES,
  PROFILE,
  SIGNIN,
  SIGNUP,
  UPDATENOTE,
} from '../utils/routes';
import Notes from '../screens/notes';
import Profile from '../screens/profile';
import AddNote from '../screens/notes/addNote';
import UpdateNote from '../screens/notes/updateNote';
import Map from '../screens/map';
import {Text, View, TouchableOpacity} from 'react-native';
import {Add, Logout, Note1, User} from 'iconsax-react-native';
import Colors from '../theme/colors';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';
import Launch from '../screens/launch';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const userSignOut = () => {
    auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('uid');
      });
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('uid', value);
    } catch (e) {
      // saving error
    }
  };

  function onAuthStateChanged(user) {
    if (user) {
      storeData(user.uid);
    }
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
      }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name={MAP}
            component={Map}
            options={({navigation}) => ({
              headerRight: () => (
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <TouchableOpacity onPress={() => navigation.navigate(NOTES)}>
                    <Note1 size={26} color={Colors.BLACK} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(PROFILE)}>
                    <User size={26} color={Colors.BLACK} />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />

          <Stack.Screen name={NOTES} component={Notes} />

          <Stack.Screen
            name={PROFILE}
            component={Profile}
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => userSignOut()}>
                  <Logout size={26} color={Colors.BLACK} />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen name={ADDNOTE} component={AddNote} />

          <Stack.Screen name={UPDATENOTE} component={UpdateNote} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{headerShown: false}}
            name={LAUNCH}
            component={Launch}
          />
          <Stack.Screen
            name={SIGNIN}
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={SIGNUP}
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
