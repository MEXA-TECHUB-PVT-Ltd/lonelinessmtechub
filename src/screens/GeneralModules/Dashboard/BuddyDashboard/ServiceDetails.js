import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { bellHome, dummy2 } from '../../../../assets/images';
import { theme } from '../../../../assets';
import DetailItem from '../../../../components/DetailItem';
import Button from '../../../../components/ButtonComponent';
import { resetNavigation } from '../../../../utils/resetNavigation';
import { scaleHeight } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import Header from '../../../../components/Header';
import HorizontalDivider from '../../../../components/HorizontalDivider';
import { SCREENS } from '../../../../constant/constants';
import useBackHandler from '../../../../utils/useBackHandler';

const ServiceDetails = ({ navigation }) => {

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
        return true;
    };
    useBackHandler(handleBackPress);

    return (
        <SafeAreaView style={styles.mianContainer}>
            <Header
                onPress={() => {
                    resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
                }}
                title={"Service Details"}
            />
            <HorizontalDivider customStyle={{
                marginTop: scaleHeight(10)
            }} />
            <View style={styles.container}>

                <View style={styles.profileSection}>
                    <View style={styles.profileView}>
                        <Image
                            style={styles.profileImage}
                            source={dummy2} // Replace with actual image URL
                        />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Olivia Williams (24)</Text>
                        <Text style={styles.profileGender}>Female</Text>
                    </View>
                </View>

                <HorizontalDivider />

                <View style={styles.locationSection}>
                    <Icon name="location-on" type="material" color="#ffd700" />
                    <Text style={styles.locationText}>Randall Peterson 1234 Maple, Street, Spr</Text>
                </View>
                <HorizontalDivider customStyle={{
                    marginTop: scaleHeight(18)
                }} />
                <View style={styles.categorySection}>
                    <Text style={{
                        color: theme.dark.secondary,
                        fontSize: scaleHeight(18),
                        fontFamily: fonts.fontsType.medium,
                        marginHorizontal: 10

                    }}>
                        Category
                    </Text>
                    <TouchableOpacity
                        style={[styles.containerItem]}
                    >
                        <Image source={bellHome} style={styles.image} />
                        <Text style={styles.text}>{'Movie Night'}</Text>
                    </TouchableOpacity>
                </View>
                <HorizontalDivider customStyle={{
                    marginTop: scaleHeight(10)
                }} />
                <View style={styles.detailsSection}>
                    <DetailItem label="Date" value="24/05/2024" />
                    <DetailItem label="Time" value="03:00 PM" />
                    <DetailItem label="Hours For Booking" value="2 HOURS" />
                    <DetailItem label="Total Price" value="$ 45" />
                    <DetailItem label="Status" value="Accepted" />
                </View>
                <View style={styles.buttonSection}>
                    <Button
                        onPress={() => {
                            resetNavigation(navigation, SCREENS.BUDDY_SEND_REQUEST)
                        }}
                        title={"Request Back"}
                        customStyle={{
                            width: '95%',
                            top: scaleHeight(30)
                        }}
                        textCustomStyle={{
                        }}
                    />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: scaleHeight(-160)
                    }}>

                        <Button title={"Reject"}
                            customStyle={{
                                width: '48%',
                                borderWidth: 1,
                                borderColor: theme.dark.secondary,
                                backgroundColor: theme.dark.transparentBg,
                                marginHorizontal: '2%',
                            }}
                            textCustomStyle={{
                                color: theme.dark.secondary,

                            }}
                        />

                        <Button title={"Accept"}
                            customStyle={{
                                width: '48%',
                            }}
                        />

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mianContainer: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        color: theme.dark.secondary,
        fontSize: 20,
        marginLeft: 10,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,

    },
    profileView: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: theme.dark.secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileInfo: {
        marginLeft: 10,
    },
    profileName: {
        color: theme.dark.white,
        fontSize: scaleHeight(18),
        fontFamily: fonts.fontsType.semiBold
    },
    profileGender: {
        color: theme.dark.white,
        fontSize: scaleHeight(14),
        fontFamily: fonts.fontsType.regular
    },
    locationSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        color: theme.dark.white,
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(17),
        width: '90%',
        alignSelf: 'center',
        top: 8

    },
    categorySection: {
        marginBottom: 10,
    },
    categoryTitle: {
        color: theme.dark.secondary,
        fontSize: 16,
        marginBottom: 10,
    },
    categoryTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#555',
        padding: 10,
        borderRadius: 5,
    },
    categoryText: {
        color: '#fff',
        marginLeft: 5,
    },
    detailsSection: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    detailLabel: {
        color: theme.dark.secondary
    },
    detailValue: {
        color: '#fff',
    },
    buttonSection: {
        alignItems: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
    },
    containerItem: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.dark.inputBg,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.dark.inputLabel,
        padding: 10,
        margin: 5,
        marginTop: 10
        //flex: 0.5,
    },
    text: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(15),
        color: theme.dark.inputLabel,
    },
    image: {
        width: 15,
        height: 15,
        marginRight: 10,
    },
});

export default ServiceDetails;
