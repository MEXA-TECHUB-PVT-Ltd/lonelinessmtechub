import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { SCREENS } from '../../constant/constants';
import { resetNavigation } from '../../utils/resetNavigation';
import useBackHandler from '../../utils/useBackHandler';
import { setRoute } from '../../redux/appSlice';

const MapScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { currentRoute } = useSelector((state) => state.app)
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [selectedLocation, setSelectedLocation] = useState(null);


    const handleBackPress = () => {

        dispatch(setRoute({
            route: SCREENS.BUDDY_PROFILE_DETAIL
        }))
        resetNavigation(navigation, currentRoute?.route)
        return true;
    };
    useBackHandler(handleBackPress);

    useEffect(() => {

        Geolocation.getCurrentPosition(
            (position) => {
                setRegion({
                    ...region,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelectLocation = (event) => {
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        });
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.searchBar} placeholder="Search here" />
            <MapView
                style={styles.map}
                region={region}
                onPress={handleSelectLocation}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                )}
            </MapView>
            {selectedLocation && (
                <View style={styles.locationInfo}>
                    <Text style={styles.locationText}>
                        {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
                    </Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Add this Location</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    searchBar: {
        position: 'absolute',
        top: 40,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    locationInfo: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    locationText: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'yellow',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
});

export default MapScreen;
