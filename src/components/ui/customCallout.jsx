import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/constants';
import Colors from '../../theme/colors';
import {Calendar, Clock, Location} from 'iconsax-react-native'; // Iconsax import

const CustomCallout = ({marker}) => {
  return (
    <View style={styles.card}>
      {/* Başlık */}
      <View style={styles.header}>
        <Location size="20" color={Colors.Color3} variant="Bold" />
        <Text style={styles.title}>
          {marker.title || 'Title not available'}
        </Text>
      </View>

      {/* Açıklama */}
      <Text style={styles.description}>
        {marker.description || 'No description available'}
      </Text>

      {/* Tarih ve Saat */}
      <View style={styles.footer}>
        <View style={styles.dateTime}>
          <Calendar size="18" color="#888" variant="Outline" />
          <Text style={styles.date}>{marker.date || 'No Date'}</Text>
        </View>
        <View style={styles.dateTime}>
          <Clock size="18" color="#888" variant="Outline" />
          <Text style={styles.date}>{marker.time || 'No Time'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 15,
    width: screenWidth * 0.55,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#777',
    marginLeft: 5,
  },
});

export default CustomCallout;
