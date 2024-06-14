//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import { Image } from 'react-native';
import { resetNavigation } from '../../../utils/resetNavigation';
import { homeLogo, searchServices } from '../../../assets/images';
import { SCREENS } from '../../../constant/constants';
import { theme } from '../../../assets';
import CustomHeader from '../../../components/CustomHeader';
import UserServicesContent from './UserDashboard/UserServicesContent';
import BuddyServicesContent from './BuddyDashboard/BuddyServicesContent';
import { useAuth } from '../../../providers/AuthProvider';

const Services = ({ navigation }) => {
    const { isLoggedIn, userRole } = useAuth();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleSearchPress = () => {
        resetNavigation(navigation, SCREENS.SEARCH_SERVICES);
    };

    const hideFilterButton = selectedIndex !== null && selectedIndex === 1;

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader
                homeLogo={homeLogo}
                title="Services"
                searchIcon={searchServices}
                onSearchPress={handleSearchPress}
                hideFilterButton={hideFilterButton}
            />
            {userRole === 'Buddy Finder' ? <UserServicesContent
                setCurrentIndex={setSelectedIndex}
            /> : <BuddyServicesContent
                setCurrentIndex={setSelectedIndex} />}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary
    },
});

//make this component available to the app
export default Services;
