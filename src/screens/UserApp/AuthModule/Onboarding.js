import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../../assets';
import { googleIcon, onboardingCurveCenter, onboardingCurveTop, onboardingLabelImg, onboardingLogo, onboarding_img } from '../../../assets/images';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import fonts from '../../../styles/fonts';
import Button from '../../../components/ButtonComponent';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';

const Onboarding = ({ navigation }) => {

    const handleNavigation = () => {
        resetNavigation(navigation, SCREENS.LOGIN)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image resizeMode='contain'
                style={styles.imageCurveTop}
                source={onboardingCurveTop} />
            <Image resizeMode='contain'
                style={styles.imageLogo}
                source={onboardingLogo} />

            <Image resizeMode='contain'
                style={[styles.imageCurveCenter]}
                source={onboardingCurveCenter} />
            <View style={styles.contentConatiner}>

                <Image resizeMode='contain'
                    style={[styles.imagebg]}
                    source={onboarding_img} />

                <Image resizeMode='contain'
                    style={[styles.imageWithLabel]}
                    source={onboardingLabelImg} />

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            handleNavigation();
                        }}
                        title={'Log In'}
                    />
                </View>

                <View style={styles.buttonContainer2}>
                    <Button
                        title={'Continue with Google'}
                        icon={<Image
                            resizeMode='contain'
                            style={{
                                width: scaleWidth(26),
                                height: scaleHeight(26)
                            }}
                            source={googleIcon} />}
                        customStyle={{
                            backgroundColor: theme.dark.transparentBg,
                            borderWidth: 0.5,
                            borderColor: theme.dark.secondary
                        }}
                        textCustomStyle={{
                            color: theme.dark.secondary,
                            fontSize: scaleHeight(16),
                        }}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={styles.createAccountItem}
                >

                    <Text style={styles.createAccountText1}>
                        Don’t have an account?
                    </Text>

                    <Text style={styles.createAccountText2}>
                        Create one
                    </Text>

                </TouchableOpacity>


            </View>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.background
    },
    contentConatiner: {
        flex: 1,
    },
    imageCurveTop: {
        width: scaleWidth(123),
        height: scaleHeight(110),
        position: 'absolute',
        top: scaleHeight(-10),
        alignSelf: 'flex-end',
        right: scaleWidth(-20)
    },
    imageLogo: {
        width: scaleWidth(79),
        height: scaleHeight(93),
        alignSelf: 'center',
        top: scaleHeight(30)
    },
    imageCurveCenter: {
        width: scaleWidth(123),
        height: scaleHeight(140),
        position: 'absolute',
        top: scaleHeight(150),
        alignSelf: 'flex-start',
        left: scaleWidth(-30),
    },

    imagebg: {
        width: scaleWidth(342),
        height: scaleHeight(383),
        position: 'absolute',
        top: scaleHeight(35),
        alignSelf: 'center',
        //left: scaleWidth(-30),
    },

    imageWithLabel: {
        width: scaleWidth(342),
        height: scaleHeight(383),
        position: 'absolute',
        top: scaleHeight(270),
        alignSelf: 'center',
        //left: scaleWidth(-30),
    },
    createAccountText1: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(16),
        color: theme.dark.white
    },
    createAccountText2: {
        fontFamily: fonts.fontsType.bold,
        fontSize: scaleHeight(16),
        color: theme.dark.secondary,
        marginHorizontal: 5
    },
    createAccountItem: {
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'absolute',
        bottom: scaleHeight(10)
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: scaleHeight(105)
    },
    buttonContainer2: {
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: scaleHeight(50)
    }
});


export default Onboarding;
