//import liraries
import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { resetNavigation } from '../../../utils/resetNavigation';
import { homeLogo, searchServices } from '../../../assets/images';
import { SCREENS } from '../../../constant/constants';
import { theme } from '../../../assets';
import CustomHeader from '../../../components/CustomHeader';
import UserServicesContent from './UserDashboard/UserServicesContent';
import BuddyServicesContent from './BuddyDashboard/BuddyServicesContent';
import { useSelector } from 'react-redux';

const Services = ({ navigation }) => {
    const { role } = useSelector((state) => state.auth);
    const [selectedIndex, setSelectedIndex] = useState(0);
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
            {role === 'USER' ? <UserServicesContent
                initialIndex={selectedIndex}
                setCurrentIndex={setSelectedIndex}
            /> : <BuddyServicesContent
                initialIndex={selectedIndex}
                setCurrentIndex={setSelectedIndex} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary
    },
});

export default Services;
