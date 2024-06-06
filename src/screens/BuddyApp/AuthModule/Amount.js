import React, { useState } from 'react';
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

const Amount = ({ navigation }) => {
    const [form, setForm] = useState({ amount: '' });
    const [errors, setErrors] = useState({ amount: '' });

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });

        let error = '';
        if (name === 'amount') {
            if (value === '') {
                error = 'Amount is required';
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.BUDDY_YOUR_INTERESTS)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleLoginNavigation = () => {
        resetNavigation(navigation, SCREENS.SIGNUP)
    }

    const handleUserName = () => {
        const { amount } = form;
        let valid = true;
        let newErrors = { amount: '' };

        if (amount === '') {
            newErrors.userName = 'amount is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // Proceed with UserName logic
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ProfileProgressBar progress={95} onPress={() => {
                resetNavigation(navigation, SCREENS.BUDDY_YOUR_INTERESTS)
            }} />
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Set Your Hourly Rate!
                    </Text>
                    <Text style={styles.subTitle}>
                        What’s your hourly worth? Adjust your rate and show your value!
                    </Text>
                    <CustomTextInput
                        identifier={'amount'}
                        value={form.amount}
                        inputType={'number-pad'}
                        placeholder={"Enter Amount"}
                        onValueChange={(value) => handleChange('amount', value)}
                        mainContainer={{ marginTop: 50 }}
                        customInputStyle={{ textAlign: 'center', marginStart: 0 }}
                        customContainerStyle={{ height: scaleHeight(60) }}
                    />
                    {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}

                </View>


                <View style={styles.buttonContainer}>

                    <HorizontalDivider
                        customStyle={{
                            marginTop: 40
                        }} />

                    <Button
                        onPress={() => {
                            //handleUserName();
                            resetNavigation(navigation, SCREENS.BUDDY_ENABLE_LOCATION)
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
        marginTop: scaleHeight(300),
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
        marginTop: 5,
        marginHorizontal: 8
    },
});


export default Amount;
