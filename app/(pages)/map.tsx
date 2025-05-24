import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MapInfo } from '../(types)/MapInfo';

export default function MapScreen() {
  const { lat, lng, address, title } = useLocalSearchParams<MapInfo>();
  const navigation = useNavigation();

  const coordinates = useMemo(() => {
    const parsedLat = parseFloat(lat as string);
    const parsedLng = parseFloat(lng as string);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      console.warn('Invalid latitude or longitude:', lat, lng);
      return null;
    }

    return {
      latitude: parsedLat,
      longitude: parsedLng,
    };
  }, [lat, lng]);

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({ title: `${title}` });
    }
  }, [navigation, title]);

  if (!coordinates) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Invalid coordinates provided. Cannot load map.</Text>
        <Text>{`lat: ${lat}, lng: ${lng}`}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={coordinates} title={title} description={address} />
      </MapView>
      {address && <Text style={styles.address}>{address}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  address: { padding: 8, textAlign: 'center' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
