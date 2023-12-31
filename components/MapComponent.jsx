import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const MapComponent = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Location permission denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        })();
    }, []);

    return (
        <View>
            {location ? (
                <Text>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </Text>
            ) : (
                <Text>Loading location...</Text>
            )}
        </View>
    );
};

export default MapComponent;