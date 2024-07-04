import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Animated } from 'react-native';
import { theme } from '../../../assets';
import { googleIcon, onboardingCurveCenter, onboardingCurveTop, onboardingLabelImg, onboardingLogo, onboarding_img } from '../../../assets/images';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import fonts from '../../../styles/fonts';
import Button from '../../../components/ButtonComponent';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import * as Animatable from 'react-native-animatable';

const Onboarding = ({ navigation }) => {

    const handleNavigation = () => {
        resetNavigation(navigation, SCREENS.LOGIN)
    }

    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000, // Duration set to 10 seconds
            useNativeDriver: true,
        }).start();
    }, [rotateAnim]);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['250deg', '360deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotateInterpolate }],
    };

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

                <Animatable.View
                    animation="slideInDown"
                    duration={2500}
                >
                    <Image resizeMode='contain'
                        style={[styles.imagebg]}
                        source={onboarding_img} />
                </Animatable.View>



                <Animatable.View animation="fadeIn"
                    duration={3000}
                >
                    <Image resizeMode='contain'
                        style={[styles.imageWithLabel]}
                        source={onboardingLabelImg} />
                </Animatable.View>



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
                        onPress={() => {
                            resetNavigation(navigation, SCREENS.STRIPE_ACCOUNT_CREATION)
                        }}
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

                <View

                    style={styles.createAccountItem}
                >

                    <Text style={styles.createAccountText1}>
                        Don’t have an account?
                    </Text>

                    <Text
                        onPress={() => {
                            resetNavigation(navigation, SCREENS.ROLE_SELECTOR)
                        }}
                        style={styles.createAccountText2}>
                        Create one
                    </Text>

                </View>


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
