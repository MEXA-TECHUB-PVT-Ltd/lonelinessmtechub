import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, } from 'react-native';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import useBackHandler from '../../../utils/useBackHandler';
import { theme } from '../../../assets';
import CustomLayout from '../../../components/CustomLayout';
import fonts from '../../../styles/fonts';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import HorizontalDivider from '../../../components/HorizontalDivider';
import Button from '../../../components/ButtonComponent';
import ProfileProgressBar from '../../../components/ProfileProgressBar';
import { alertLogo, mapImg, successText, success_alert_img } from '../../../assets/images';
import { color } from '@rneui/base';
import Modal from "react-native-modal";

const EnableLocation = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.YOUR_INTERESTS)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleLoginNavigation = () => {
        resetNavigation(navigation, SCREENS.SIGNUP)
    }

    const showHideModal = () => {
        setModalVisible(true);
        // Hide the modal after 3 seconds
        setTimeout(() => {
            setModalVisible(false);
            resetNavigation(navigation, SCREENS.LOGIN)
        }, 3000);
    };

    const showModalView = () => {

        return <Modal
            backdropOpacity={0.90}
            backdropColor={'rgba(85, 85, 85, 0.70)'}
            isVisible={modalVisible}
            animationIn={'bounceIn'}
            animationOut={'bounceOut'}
            animationInTiming={1000}
            animationOutTiming={1000}
        >
            <View style={{
                backgroundColor: '#111111',
                width: '90%',
                height: '50%',
                alignSelf: 'center',
                borderRadius: 20,
                elevation: 20,
                padding: 20
            }}>

                <Image
                    resizeMode='contain'
                    source={alertLogo}
                    style={{
                        width: scaleWidth(120),
                        height: scaleHeight(120),
                        alignSelf: 'center'
                    }}
                />

                <Image
                    resizeMode='contain'
                    source={successText}
                    style={{
                        width: scaleWidth(130),
                        height: scaleHeight(45),
                        alignSelf: 'center',
                        marginTop: 10
                    }}
                />
                <Text style={styles.subTitle}>
                    {`Please wait...${'\n'}You will be directed to the homepage`}
                </Text>





            </View>
        </Modal>
    }


    return (
        <SafeAreaView style={styles.container}>
            <ProfileProgressBar progress={100} onPress={() => {
                resetNavigation(navigation, SCREENS.YOUR_INTERESTS)
            }} />
            <CustomLayout>
                <View style={styles.contentContainer}>

                    <Image style={styles.imageStyle} source={mapImg} />

                    <Text style={styles.welcomeText}>
                        Enable Location
                    </Text>
                    <Text style={styles.subTitle}>
                        You need to enable location to be able to use the Loneliness App.
                    </Text>

                </View>

                <View style={styles.buttonContainer}>

                    <HorizontalDivider
                        customStyle={{
                            marginTop: 40
                        }} />

                    <Button
                        onPress={() => {
                            //handlebirthDate();
                            showHideModal()
                        }}
                        title={'Use My Current Location'}
                        customStyle={{
                            marginBottom: scaleHeight(10)
                        }}
                    />

                    <Button
                        onPress={() => {
                            resetNavigation(navigation, SCREENS.ADD_LOCATION)
                        }}
                        title={'Enter Location Manually'}
                        customStyle={{
                            backgroundColor: theme.dark.transparentBg,
                            borderColor: theme.dark.secondary,
                            borderWidth: 1,
                            marginTop: scaleHeight(5)
                        }}
                        textCustomStyle={{
                            color: theme.dark.secondary
                        }}
                    />
                </View>

            </CustomLayout>
            {showModalView()}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.background
    },
    contentContainer: {
        padding: 25,
        flex: 1,
        top: scaleHeight(100)
    },
    welcomeText: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(22),
        color: theme.dark.white,
        marginTop: 15,
        alignSelf: 'center'
    },
    subTitle: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(14),
        color: theme.dark.heading,
        marginTop: 5,
        alignSelf: 'center',
        textAlign: 'center',
        width: scaleWidth(300)
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: scaleHeight(180),
        marginBottom: scaleHeight(20)
    },

    imageStyle: {
        width: scaleWidth(150),
        height: scaleHeight(150),
        marginTop: scaleHeight(30),
        alignSelf: 'center'
    }
});


export default EnableLocation;
