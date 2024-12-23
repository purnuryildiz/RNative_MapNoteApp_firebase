import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Colors from '../../theme/colors';
import firestore from '@react-native-firebase/firestore';
import CustomCallout from '../../components/ui/customCallout';
import FloatActionButton from '../../components/ui/floatAction';
import {ArrowRight, Map1, Refresh2} from 'iconsax-react-native';
import {ADDNOTE} from '../../utils/routes';
import {screenHeight, screenWidth} from '../../utils/constants';

const Map = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [position, setPosition] = useState(null);
  const [coordinate, setCoordinate] = useState(null);
  const [mapType, setMapType] = useState('standard');
  const [loading, setLoading] = useState(true); // Yükleme durumunu takip etmek için state

  // Kullanıcının mevcut konumunu al
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(pos.coords); // Yalnızca latitude ve longitude bilgisi saklanır
        setLoading(false); // Konum alındığında yükleme bitiyor
      },
      error => {
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error));
        setLoading(false); // Hata durumunda da yükleme durduruluyor
      },
      {enableHighAccuracy: true},
    );
  };

  // Firestore'dan notları çek
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
            description: documentSnapshot.data().description,
            coordinate: {
              latitude: documentSnapshot.data().coordinate.latitude,
              longitude: documentSnapshot.data().coordinate.longitude,
            },
            date: documentSnapshot.data().date,
            time: documentSnapshot.data().time,
          });
        });
        setNotes(notes);
        setLoading(false); // Notlar yüklendiğinde yükleme bitiyor
      });
  };

  useEffect(() => {
    // İlk olarak konumu alıyoruz, ardından notları çekiyoruz
    getCurrentPosition();
    getNotes();
  }, []);

  // Yükleme ekranı (position henüz alınmadıysa veya notlar alınmadıysa)
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.Color3} />
      </View>
    );
  }

  // Coordinate seçmek için haritada
  const handleMarkerPress = e => {
    const {coordinate} = e?.nativeEvent;
    setCoordinate(coordinate);
  };

  // mapType değiştirmek için
  const changeMapType = () => {
    if (mapType == 'standard') setMapType('satellite');
    else setMapType('standard');
  };

  return (
    <View style={styles.container}>
      <MapView
        mapType={mapType}
        showsUserLocation
        onPress={handleMarkerPress}
        style={styles.map}
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.4,
          longitudeDelta: 0.0421,
        }}>
        {/* Notlar için işaretçiler */}
        {notes.map(
          (marker, index) =>
            marker.coordinate && (
              <Marker
                key={index}
                coordinate={{
                  longitude: marker.coordinate.longitude,
                  latitude: marker.coordinate.latitude,
                }}
                title={marker.title || 'No Title'}
                description={marker.description || 'No Description'}
                date={marker.date || 'No Date'}
                time={marker.time || 'No Time'}>
                <Callout>
                  <CustomCallout marker={marker} />
                </Callout>
              </Marker>
            ),
        )}
        {coordinate && (
          <Marker
            coordinate={{
              longitude: coordinate.longitude,
              latitude: coordinate.latitude,
            }}
          />
        )}
      </MapView>
      {coordinate && (
        <FloatActionButton
          backgroundColor={Colors.Color3}
          onPress={() => navigation.navigate(ADDNOTE, {coordinate: coordinate})}
          icon={<ArrowRight color={Colors.WHITE} size={30} />}
        />
      )}
      <FloatActionButton
        customStyle={{
          top: 20,
          width: screenWidth * 0.1,
          height: screenHeight * 0.05,
        }}
        onPress={() => changeMapType()}
        backgroundColor={mapType == 'standard' ? Colors.WHITE : Colors.Color5}
        icon={
          <Map1
            color={mapType == 'standard' ? Colors.Color3 : Colors.BLACK}
            size={34}
          />
        }
      />
      <FloatActionButton
        customStyle={{
          top: 20,
          width: screenWidth * 0.1,
          height: screenHeight * 0.05,
          left: 10,
        }}
        onPress={() => getNotes()}
        backgroundColor={Colors.WHITE}
        icon={<Refresh2 color={Colors.Color3} size={34} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
});

export default Map;
