import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import useBackHandler from '../../../utils/useBackHandler';
import { theme } from '../../../assets';
import CustomTextInput from '../../../components/TextInputComponent';
import CustomLayout from '../../../components/CustomLayout';
import fonts from '../../../styles/fonts';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import HorizontalDivider from '../../../components/HorizontalDivider';
import Button from '../../../components/ButtonComponent';
import ProfileProgressBar from '../../../components/ProfileProgressBar';


const BuddyAbout = ({ navigation }) => {
    const [form, setForm] = useState({ about: '' });
    const [errors, setErrors] = useState({ about: '' });


    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });

        let error = '';
        if (name === 'about') {
            if (value === '') {
                error = 'About can not be empty';
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.BUDDY_PROFILE_PICTURE)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleLoginNavigation = () => {
        resetNavigation(navigation, SCREENS.SIGNUP)
    }


    const handleAbout = () => {
        const { about } = form;
        let valid = true;
        let newErrors = { about: '' };

        if (about === '') {
            newErrors.about = 'Phone number is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // Proceed with About logic
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <ProfileProgressBar progress={40} onPress={() => {
                resetNavigation(navigation, SCREENS.BUDDY_PROFILE_PICTURE)
            }} />
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Tell Us About Yourself
                    </Text>
                    <Text style={styles.subTitle}>
                        Tell us about yourself so others can get to know you.
                    </Text>
                    <CustomTextInput
                        identifier={'about'}
                        value={form.about}
                        onValueChange={(value) => handleChange('about', value)}
                        mainContainer={{ marginTop: 50 }}
                        customInputStyle={{}}
                        customContainerStyle={{}}
                        multiline={true}
                    />
                    {errors.about ? <Text style={styles.errorText}>{errors.about}</Text> : null}

                </View>

                <View style={styles.buttonContainer}>

                    <HorizontalDivider
                        customStyle={{
                            marginTop: 40
                        }} />

                    <Button
                        onPress={() => {
                            //handleAbout();
                            resetNavigation(navigation, SCREENS.BUDDY_BIRTH_DATE)
                        }}
                        title={'Continue'}
                    />
                </View>

            </CustomLayout>

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
        flex: 1
    },
    welcomeText: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(22),
        color: theme.dark.white,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(14),
        color: theme.dark.heading,
        marginTop: 5
    },
    forgetText: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(14),
        color: theme.dark.secondary,
        alignSelf: 'center'
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
        marginHorizontal: 5,
        textDecorationLine: 'underline'
    },
    createAccountItem: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 30,
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: scaleHeight(200),
        marginBottom: scaleHeight(20)
    },
    createAccountView: {
        flex: 1
    },
    forgetPassContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    backButton: {
        alignSelf: 'center'
    },
    errorText: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(12),
        color: theme.dark.error,
        marginTop: 8,
        marginHorizontal: scaleWidth(15),
    },
});


export default BuddyAbout;
