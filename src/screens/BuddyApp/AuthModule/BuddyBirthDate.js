import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput } from 'react-native';
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
import { birthdayImg } from '../../../assets/images';

const BuddyBirthDate = ({ navigation }) => {
    const [form, setForm] = useState({ birthDate: '' });
    const [errors, setErrors] = useState({ birthDate: '' });

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });

        let error = '';
        if (name === 'birthDate') {
            if (value === '') {
                error = 'Birthdate is required';
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.BUDDY_ABOUT)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleLoginNavigation = () => {
        resetNavigation(navigation, SCREENS.SIGNUP)
    }


    const handlebirthDate = () => {
        const { birthDate } = form;
        let valid = true;
        let newErrors = { birthDate: '' };

        if (birthDate === '') {
            newErrors.birthDate = 'Birthdate is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // Proceed with birthDate logic
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <ProfileProgressBar progress={50} onPress={() => {
                resetNavigation(navigation, SCREENS.BUDDY_ABOUT)
            }} />
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Let’s Celebrate You!
                    </Text>
                    <Text style={styles.subTitle}>
                        Tell us your birthday. Your profile doesn’t display your birthday, only your age.
                    </Text>
                    <Image style={styles.imageStyle} source={birthdayImg} />

                    <View style={styles.inputContainerStyle}>

                        <TextInput
                            placeholder='DD'
                            placeholderTextColor={theme.dark.inputLabel}
                            maxLength={2}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                        />

                        <View style={styles.verticleLine}></View>

                        <TextInput
                            placeholder='MM'
                            placeholderTextColor={theme.dark.inputLabel}
                            maxLength={2}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                        />

                        <View style={styles.verticleLine}></View>

                        <TextInput
                            placeholder='YYYY'
                            placeholderTextColor={theme.dark.inputLabel}
                            maxLength={4}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                        />

                    </View>

                </View>

                <View style={styles.buttonContainer}>

                    <HorizontalDivider
                        customStyle={{
                            marginTop: 40
                        }} />

                    <Button
                        onPress={() => {
                            //handlebirthDate();
                            resetNavigation(navigation, SCREENS.BUDDY_GENDER_SELECTION)
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
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: scaleHeight(200),
        marginBottom: scaleHeight(20)
    },

    verticleLine: {
        height: '60%',
        width: 1,
        backgroundColor: '#909090',
    },
    inputStyle: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(18),
        color: theme.dark.inputLabel,
        textAlign: 'center',
        flex: 1
    },
    inputContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.dark.inputBg,
        marginTop: scaleHeight(30),
        height: scaleHeight(55),
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.dark.text,
        justifyContent: 'space-evenly'
    },
    imageStyle: {
        width: scaleWidth(90),
        height: scaleHeight(100),
        marginTop: scaleHeight(30),
        alignSelf: 'center'
    }
});


export default BuddyBirthDate;
