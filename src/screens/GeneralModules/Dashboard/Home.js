import React, { useState } from 'react';
import {
    Image, SafeAreaView, StyleSheet, View, TouchableOpacity
} from 'react-native';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import { theme } from '../../../assets';
import {
    bellHome,
    filterHome,
    filterHomeOff,
    homeLogo,
    labelHome
} from '../../../assets/images';
import fonts from '../../../styles/fonts';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import BuddyHomeContent from './BuddyDashboard/BuddyHomeContent';
import UserHomeContent from './UserDashboard/UserHomeContent';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/AuthModule/signInSlice';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.auth);
    const [showFilterModal, setFilterModal] = useState(false);
    const [isFilter, setFilter] = useState(false);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => dispatch(logout())}>
                    <Image source={homeLogo} style={[styles.logo, { right: role !== "USER" ? 15 : 0 }]} />
                </TouchableOpacity>

                <Image source={labelHome} style={styles.labelHome} />

                <TouchableOpacity style={styles.bellContainer} onPress={() => resetNavigation(navigation, SCREENS.NOTIFICATION)}>
                    <Image source={bellHome} style={styles.bellIcon} />
                </TouchableOpacity>

                {role === 'USER' && <TouchableOpacity style={styles.filterContainer} onPress={() => setFilterModal(true)}>
                    <Image source={isFilter ? filterHome : filterHomeOff} style={styles.filterIcon} />
                </TouchableOpacity>}
            </View>

            {
                role === 'USER' ? (
                    <UserHomeContent
                        showFilterModal={showFilterModal}
                        setFilterModal={setFilterModal}
                        setFilter={setFilter}
                    />
                ) : (
                    <BuddyHomeContent />
                )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary
    },
    headerContainer: {
        marginTop: scaleHeight(10),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    logo: {
        width: scaleWidth(35),
        height: scaleHeight(42),
        alignSelf: 'center',
    },
    labelHome: {
        width: scaleWidth(130),
        height: scaleHeight(27),
        alignSelf: 'center',
    },
    bellContainer: {
        justifyContent: 'center'
    },
    bellIcon: {
        width: scaleWidth(27),
        height: scaleHeight(27),
        alignSelf: 'center',
        right: scaleWidth(-20),
    },
    filterContainer: {
        justifyContent: 'center'
    },
    filterIcon: {
        width: scaleWidth(27),
        height: scaleHeight(27),
        alignSelf: 'center',
    },
});

export default Home;
