//import liraries
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Colors from '../../theme/colors';
import {Edit, Edit2, Trash} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {UPDATENOTE} from '../../utils/routes';
import firestore from '@react-native-firebase/firestore';

// create a component
const NoteItem = ({item}) => {
  const navigation = useNavigation();
  const deleteNote = () => {
    firestore()
      .collection('Notes')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('Note has been deleted!');
      });
  };
  const askUser = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteNote('OK Pressed')},
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.explanation}>{item.explanation}</Text>
        <Text style={styles.time}>
          {item.date} - {item.time}
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 5}}>
        <TouchableOpacity
          onPress={() => navigation.navigate(UPDATENOTE, {note: item})}
          style={styles.editButton}>
          <Edit2 color={Colors.WHITE} size={14} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => askUser()}
          style={[styles.editButton, styles.deleteButton]}>
          <Trash color={Colors.WHITE} size={14} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.Color5,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.DARKGRAY,
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.GRAY,
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    fontWeight: '300',
    color: Colors.Color2,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 10,
  },
  editButton: {
    backgroundColor: Colors.Color3,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  deleteButton: {
    backgroundColor: Colors.Color2,
  },
});

//make this component available to the app
export default NoteItem;
