//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import screenStyles from '../../styles/screenStyles';
import {Input, Button} from '@ui-kitten/components';
import uiElementStyles from '../../styles/uiElementStyles';
import {Formik} from 'formik';

import firestore from '@react-native-firebase/firestore';
import {AddNoteSchema} from '../../utils/schemas';
import CustomModal from '../../components/ui/customModal';
import Colors from '../../theme/colors';

// create a component
const AddNote = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const coordinate = route.params.coordinate;
  console.log(coordinate);
  const addNote = values => {
    setLoading(true);
    firestore()
      .collection('Notes')
      .add(values)
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
  return (
    <View style={screenStyles.container}>
      <CustomModal
        visible={visible}
        status={status}
        message={
          status
            ? 'Your note has been added successfully.'
            : 'Something went wrong. Please try again!'
        }
        closeModal={() => {
          setVisible(false);
          navigation.goBack();
        }}
      />
      <Formik
        initialValues={{
          title: '',
          description: '',
          date: '',
          time: '',
          coordinate: coordinate,
        }}
        validationSchema={AddNoteSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => addNote(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <Input
              status={errors.title ? 'danger' : 'basic'}
              caption={errors.title}
              style={uiElementStyles.input}
              value={values.title}
              label="Title"
              placeholder=""
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
            />
            <Input
              status={errors.description ? 'danger' : 'basic'}
              caption={errors.description}
              multiline
              size="large"
              style={uiElementStyles.input}
              value={values.description}
              label="Description"
              placeholder=""
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
            />
            <Input
              status={errors.date ? 'danger' : 'basic'}
              caption={errors.date}
              style={uiElementStyles.input}
              value={values.date}
              label="Date"
              placeholder=""
              onChangeText={handleChange('date')}
              onBlur={handleBlur('date')}
            />
            <Input
              status={errors.time ? 'danger' : 'basic'}
              caption={errors.time}
              style={uiElementStyles.input}
              value={values.time}
              label="Time"
              placeholder=""
              onChangeText={handleChange('time')}
              onBlur={handleBlur('time')}
            />
            <Button
              disabled={loading}
              size="large"
              style={uiElementStyles.button}
              onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Colors.Color3} />
              ) : (
                'SAVE'
              )}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

//make this component available to the app
export default AddNote;
