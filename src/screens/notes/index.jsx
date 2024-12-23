//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import screenStyles from '../../styles/screenStyles';
import firestore from '@react-native-firebase/firestore';
import FloatActionButton from '../../components/ui/floatAction';
import NoteItem from '../../components/notes/noteItem';
import {useNavigation} from '@react-navigation/native';
import {ADDNOTE} from '../../utils/routes';
import {Add} from 'iconsax-react-native';
import Colors from '../../theme/colors';

// create a component
const Notes = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const getNotes = () => {
    firestore()
      .collection('Notes')
      .get()
      .then(querySnapshot => {
        let notes = [];
        querySnapshot.forEach(documentSnapshot => {
          notes.push({
            id: documentSnapshot.id,
            title: documentSnapshot.data().title,
            explanation: documentSnapshot.data().description,
            time: documentSnapshot.data().time,
            date: documentSnapshot.data().date,
          });
        });
        setNotes(notes);
      });
  };
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <View style={screenStyles.container}>
      <FlatList
        data={notes}
        renderItem={({item}) => <NoteItem item={item} />}
      />
      <FloatActionButton
        backgroundColor={Colors.Color3}
        icon={<Add size={50} color={Colors.WHITE} />}
        onPress={() => navigation.navigate(ADDNOTE)}
      />
    </View>
  );
};

//make this component available to the app
export default Notes;
