//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../theme/colors';
import {screenHeight, screenWidth} from '../../utils/constants';
import {Add} from 'iconsax-react-native';

// create a component
const FloatActionButton = props => {
  const {icon, backgroundColor, customStyle = {}} = props;
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        {backgroundColor: backgroundColor},
        customStyle,
      ]}>
      {icon}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Color3,
    width: screenWidth * 0.2,
    height: screenHeight * 0.09,
    position: 'absolute',
    bottom: screenHeight * 0.05,
    right: 20,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

//make this component available to the app
export default FloatActionButton;
