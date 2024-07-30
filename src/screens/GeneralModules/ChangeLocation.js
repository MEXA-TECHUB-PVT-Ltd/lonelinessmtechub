import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SCREENS } from '../../constant/constants';
import { resetNavigation } from '../../utils/resetNavigation';
import useBackHandler from '../../utils/useBackHandler';
import { setRoute } from '../../redux/appSlice';
import { theme } from '../../assets';
import Button from '../../components/ButtonComponent';
import HorizontalDivider from '../../components/HorizontalDivider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scaleHeight, scaleWidth } from '../../styles/responsive';
import { changeLocationImg } from '../../assets/images';
import fonts from '../../styles/fonts';
import { requestLocationPermission } from '../../utils/cameraPermission';
import { MAP_API_KEY } from '@env'

const MapScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const { currentRoute } = useSelector((state) => state.app)
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [selectedLocation, setSelectedLocation] = useState(null)

    const handleBackPress = () => {
        dispatch(setRoute({
            route: SCREENS.BUDDY_PROFILE_DETAIL
        }))
        resetNavigation(navigation, currentRoute?.route)
        return true;
    };
    useBackHandler(handleBackPress);

    useEffect(() => {
        requestLocationPermission();
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
            name: null,
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        });
    };

    const handlePlaceSelected = (data, details) => {
        if (details) {
            const { lat, lng } = details.geometry.location;
            const placeName = details.formatted_address;
            setSelectedLocation({
                name: placeName,
                latitude: lat,
                longitude: lng,
            });
            setRegion({
                ...region,
                latitude: lat,
                longitude: lng,
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={theme.dark.primary} />
                </TouchableOpacity>
                <GooglePlacesAutocomplete
                    placeholder="Search here"
                    onPress={handlePlaceSelected}
                    query={{
                        key: MAP_API_KEY,
                        language: 'en',
                    }}
                    fetchDetails
                    onFail={error => console.log(error)}
                    onNotFound={() => console.log('no results')}
                    styles={{
                        textInput: styles.searchBar,
                        container: {
                            flex: 1,
                            zIndex: 1,
                        },
                    }}
                    textInputProps={{
                        placeholderTextColor: theme.dark.inputLabel,
                    }}
                />
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onPress={handleSelectLocation}
            // showsUserLocation
            // followsUserLocation
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                )}
            </MapView>
            {selectedLocation && (
                <View style={styles.locationInfo}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Image
                            resizeMode='contain'
                            style={{
                                width: scaleWidth(45),
                                height: scaleHeight(45)
                            }} source={changeLocationImg} />
                        <Text style={styles.locationText}>
                            {selectedLocation.name ? selectedLocation.name : `${selectedLocation.latitude.toFixed(4)}, ${selectedLocation.longitude.toFixed(4)}`}
                        </Text>
                    </View>
                    <HorizontalDivider customStyle={{
                        backgroundColor: theme.dark.inputLabel,
                    }} />
                    <Button title={'Add this Location'} customStyle={{
                        marginBottom: 0
                    }} />
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
        fontSize: scaleHeight(14),
        fontFamily: fonts.fontsType.light,
        backgroundColor: theme.dark.inputBg,
        color: theme.dark.heading,
        padding: 10,
        borderRadius: 30,


    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    locationInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.dark.white,
        padding: 20,
        borderRadius: 10,

        borderTopEndRadius: 30,
        borderTopStartRadius: 30
    },
    locationText: {
        fontSize: scaleHeight(16),
        fontFamily: fonts.fontsType.regular,
        color: theme.dark.primary,
        marginBottom: 10,
        alignSelf: 'center',
        marginHorizontal: 10
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
    searchContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 30,
        left: '10%',
        right: 10,
        zIndex: 1,
        width: '80%',
        alignSelf: 'center'
    },
    backButton: {
        padding: 10,
    },
});

export default MapScreen;
