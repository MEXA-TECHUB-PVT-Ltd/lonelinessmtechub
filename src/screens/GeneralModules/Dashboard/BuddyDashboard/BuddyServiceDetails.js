import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { bellHome, dummy2, locationPin } from '../../../../assets/images';
import { theme } from '../../../../assets';
import DetailItem from '../../../../components/DetailItem';
import Button from '../../../../components/ButtonComponent';
import { resetNavigation } from '../../../../utils/resetNavigation';
import { scaleHeight, scaleWidth } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import Header from '../../../../components/Header';
import HorizontalDivider from '../../../../components/HorizontalDivider';
import { SCREENS } from '../../../../constant/constants';
import useBackHandler from '../../../../utils/useBackHandler';
import { ScrollView } from 'react-native-gesture-handler';
import { useAlert } from '../../../../providers/AlertContext';

const BuddyServiceDetails = ({ navigation, route }) => {
    const { showAlert } = useAlert();
    const { index } = route.params

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.SERVICES })
        return true;
    };
    useBackHandler(handleBackPress);


    const getColorByStatus = (status) => {

        switch (status) {
            case "Accepted":
                return '#00E200';

            case "Rejected":
                return '#FF2A04';


            case "Canceled":
                return '#FF2A04';


            case "Pending":
                return '#F9D800';

            case "Requested":
                return '#4285F4';

            default:
                return '#00000000';
        }
    }

    const handleButtonClick = (description) => {
        showAlert("Success", "success", description)
        setTimeout(() => {
            resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.SERVICES })
        }, 3000);

    }

    return (
        <SafeAreaView style={styles.mianContainer}>
            <Header
                onPress={() => {
                    resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.SERVICES })
                }}
                title={"Service Details"}
            />
            <HorizontalDivider customStyle={{
                marginTop: scaleHeight(10)
            }} />

            <ScrollView>
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

                        {index == 1 && <TouchableOpacity style={{
                            width: scaleWidth(46),
                            height: scaleHeight(25),
                            borderRadius: 30,
                            backgroundColor: theme.dark.secondary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 12
                        }}>
                            <Icon name="check" type="material" size={16} color={theme.dark.black} />
                        </TouchableOpacity>}
                    </View>

                    <HorizontalDivider />

                    <View style={styles.locationSection}>
                        <Icon name="location-on" type="material" color={theme.dark.secondary} />
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
                        {/* <DetailItem label="Status" value="Accepted" /> */}
                    </View>
                    <HorizontalDivider />


                    {index === 2 && <View>

                        <View style={[styles.categorySection, { marginTop: 10, flexDirection: 'row' }]}>
                            <Text style={{
                                color: theme.dark.secondary,
                                fontSize: scaleHeight(18),
                                fontFamily: fonts.fontsType.medium,
                                marginHorizontal: 10,
                                marginBottom: 10,
                                flex: 1

                            }}>
                                Request by me
                            </Text>

                            <View style={[styles.statusContainer, { backgroundColor: getColorByStatus("Accepted") },]}>
                                <Text style={styles.statusText}>
                                    {'Accepted'}
                                </Text>
                            </View>

                        </View>

                        <DetailItem label="Date" value="24/05/2024" />
                        <DetailItem label="Time" value="03:00 PM" />
                        <DetailItem label="Location" />
                        <View style={{
                            flexDirection: 'row',
                            marginTop: scaleHeight(10),
                            marginHorizontal: -5,
                        }}>

                            <Image
                                resizeMode='contain'
                                style={{

                                    width: scaleWidth(22),
                                    height: scaleHeight(22),
                                    alignSelf: 'center',

                                }} source={locationPin} />

                            <Text style={{
                                color: theme.dark.white,
                                fontSize: scaleHeight(14),
                                fontFamily: fonts.fontsType.regular,
                                marginHorizontal: 5
                            }}>
                                Randall Peterson 1234 Maple, Street, Spr...
                            </Text>

                        </View>
                    </View>
                    }

                    {index == 1 && <View style={[styles.categorySection, { marginTop: 10 }]}>
                        <Text style={{
                            color: theme.dark.secondary,
                            fontSize: scaleHeight(18),
                            fontFamily: fonts.fontsType.medium,
                            marginHorizontal: 10,
                            marginBottom: 10

                        }}>
                            Rating of Services
                        </Text>

                        <Image
                            style={{
                                width: scaleWidth(128),
                                height: scaleHeight(22),
                                marginHorizontal: 8,
                                marginBottom: 10
                            }}
                            source={require('../../../../assets/images/stars.png')} />

                        <Text style={{
                            color: theme.dark.inputLabel,
                            fontSize: scaleHeight(16),
                            fontFamily: fonts.fontsType.light,
                            marginHorizontal: 10

                        }}>
                            Had an amazing time with Olivia William! Great company and lots of fun. Looking forward to our next get-together!
                        </Text>

                    </View>}

                    <View style={styles.buttonSection}>
                        {index !== 1 && <Button
                            onPress={() => {
                                //resetNavigation(navigation, SCREENS.BUDDY_SEND_REQUEST)

                                if (index == 0) {
                                    handleButtonClick("Request sent successfully")
                                } else {
                                    resetNavigation(navigation, SCREENS.BUDDY_SEND_REQUEST)
                                }
                            }}
                            title={index == 0 ? "Request for Payment" : "Request Back"}
                            customStyle={{
                                width: '95%',
                                top: scaleHeight(30)
                            }}
                            textCustomStyle={{
                            }}
                        />}

                        {index !== 1 && index !== 0 && <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            //marginBottom: scaleHeight(-160)
                        }}>

                            <Button
                                onPress={() => {
                                    handleButtonClick("Request rejected successfully.")
                                }}
                                title={"Reject"}
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

                            <Button
                                onPress={() => {
                                    handleButtonClick("Request accepted successfully.")
                                }}
                                title={"Accept"}
                                customStyle={{
                                    width: '48%',
                                }}
                            />

                        </View>}
                    </View>
                </View>
            </ScrollView>
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
        padding: 16,
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
        flex: 1
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
    statusContainer: {
        height: scaleHeight(30),
        backgroundColor: '#00E200',
        borderRadius: 20,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusText: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(12),
        color: theme.dark.white,
        alignSelf: 'center'
    },
});

export default BuddyServiceDetails;
