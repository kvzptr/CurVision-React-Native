import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert, Text, ActivityIndicator } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';

export default function MapsPage() {
  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const [notification, setNotification] = useState('');
  const [notificationSpoken, setNotificationSpoken] = useState(false);
  const mapRef = useRef(null);

  const geofence = {
    latitude: 10.796362,
    longitude: 123.994095,
    radius: 500, // radius in meters
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please enable location services to use the map.');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 1,
        },
        handleLocationUpdate
      );

      return () => {
        locationSubscription.remove();
      };
    };

    requestPermissions();
  }, []);

  const handleLocationUpdate = (newLocation) => {
    const { latitude, longitude } = newLocation.coords;
    setLocation(newLocation.coords);
    if (!region) {
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }

    const distance = getDistanceFromLatLonInMeters(
      latitude,
      longitude,
      geofence.latitude,
      geofence.longitude
    );

    if (distance <= geofence.radius && !notificationSpoken) {
      triggerNotification();
    } else if (distance > geofence.radius) {
      setNotificationSpoken(false);
    }
  };

  const triggerNotification = () => {
    const message = "WARNING! You're Entering a Blind Curve Area";
    setNotification(message);
    Speech.speak(message);
    setNotificationSpoken(true);
    setTimeout(() => {
      setNotification('');
    }, 10000);
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <Text style={styles.notification}>
          MapView is not supported on the web.
        </Text>
      ) : (
        <>
          {!region && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="maroon" />
            </View>
          )}
          {region && (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={region}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              <Circle
                center={{ latitude: geofence.latitude, longitude: geofence.longitude }}
                radius={geofence.radius}
                fillColor="rgba(255, 0, 0, 0.2)"
                strokeColor="rgba(255, 0, 0, 1)"
                strokeWidth={3}
              />
            </MapView>
          )}
          {notification && <Text style={styles.notification}>{notification}</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    position: 'absolute',
    top: 50,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center'
  },
});