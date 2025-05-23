import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MapInfo } from '../(types)/MapInfo';

export default function MapScreen() {
  const {lat, lng, address, title} = useLocalSearchParams<MapInfo>()
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({ title: `${title}` });
    }
  }, [navigation, title]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: Number(lat) + 50,
          longitude: Number(lng) + 100,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude: -6.2, longitude: 106.8 }} />
      </MapView>
      <Text>{ address }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
