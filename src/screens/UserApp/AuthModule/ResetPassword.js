import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import useBackHandler from '../../../utils/useBackHandler';
import { theme } from '../../../assets';
import CustomTextInput from '../../../components/TextInputComponent';
import CustomLayout from '../../../components/CustomLayout';
import fonts from '../../../styles/fonts';
import { scaleHeight } from '../../../styles/responsive';
import CheckBox from '../../../components/CheckboxComponent';
import HorizontalDivider from '../../../components/HorizontalDivider';
import Button from '../../../components/ButtonComponent';
import Icon from 'react-native-vector-icons/MaterialIcons'
import EmailIcon from 'react-native-vector-icons/Zocial'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ResetPassword = ({ navigation }) => {
    const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassShow, setConfirmPassShow] = useState(false);

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });

        let error = '';
        if (name === 'newPassword') {
            if (value === '') {
                error = 'Password is required.';
            } else if (!validatePassword(value)) {
                error = 'Password must be at least 6 characters long.';
            }
        } else if (name === 'confirmPassword') {
            if (value === '') {
                error = 'Confirm Password is required.';
            }

        }
        setErrors({ ...errors, [name]: error });
    };

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.VERIFY_EMAIL)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleResetPass = () => {

    }


    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleResetPassword = () => {
        const { newPassword, confirmPassword } = form;
        let valid = true;
        let newErrors = { newPassword: '', confirmPassword: '' };

        if (newPassword === '') {
            newErrors.newPassword = 'New Password is required.';
            valid = false;
        } else if (!validatePassword(newPassword)) {
            newErrors.newPassword = 'Password must be at least 6 characters long.';
            valid = false;
        }

        if (confirmPassword === '') {
            newErrors.confirmPassword = 'Confirm Password is required';
            valid = false;
        }

        else if (confirmPassword != newPassword) {
            newErrors.confirmPassword = 'Password does not match.';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // Proceed with login logic
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    resetNavigation(navigation, SCREENS.VERIFY_EMAIL)
                }}
                style={styles.backButton}>

                <Icon name={'arrow-back'} size={28} color={theme.dark.secondary} />

            </TouchableOpacity>
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Reset Password 🔒
                    </Text>
                    <Text style={styles.subTitle}>
                        Create your new password
                    </Text>
                    <CustomTextInput
                        label={'New Password'}
                        identifier={'newPassword'}
                        value={form.newPassword}
                        secureTextEntry={!showPassword}
                        onValueChange={(value) => handleChange('newPassword', value)}
                        mainContainer={{ marginTop: 50 }}
                        iconComponent={
                            <MaterialCommunityIcons
                                onPress={() => {
                                    setShowPassword(!showPassword)
                                }}
                                style={{
                                    marginEnd: 8

                                }} name={!showPassword ? "eye" : 'eye-off'} size={20}
                                color={theme.dark.text} />
                        }
                    />
                    {errors.newPassword ? <Text style={styles.errorText}>{errors.newPassword}</Text> : null}
                    <CustomTextInput
                        label={'Confirm Password'}
                        identifier={'confirmPassword'}
                        value={form.confirmPassword}
                        secureTextEntry={!confirmPassShow}
                        onValueChange={(value) => handleChange('confirmPassword', value)}
                        mainContainer={{ marginTop: 15 }}
                        iconComponent={
                            <MaterialCommunityIcons
                                onPress={() => {
                                    setConfirmPassShow(!confirmPassShow)
                                }}
                                style={{
                                    marginEnd: 8

                                }} name={!confirmPassShow ? "eye" : 'eye-off'} size={20}
                                color={theme.dark.text} />
                        }
                    />
                    {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

                </View>


                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            handleResetPassword();
                        }}
                        title={'Reset'}
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
        fontSize: scaleHeight(26),
        color: theme.dark.white,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(14),
        color: theme.dark.white,
        marginTop: 5
    },

    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: scaleHeight(120)
    },

    backButton: {
        paddingHorizontal: 25,
        marginTop: 20
    },
    errorText: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(12),
        color: theme.dark.error,
        marginTop: 5,
        marginHorizontal: 8
    },
});


export default ResetPassword;

