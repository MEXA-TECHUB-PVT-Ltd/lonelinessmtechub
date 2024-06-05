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

const Login = ({ navigation }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });

        let error = '';
        if (name === 'email') {
            if (value === '') {
                error = 'Email address is required';
            } else if (!validateEmail(value)) {
                error = 'Please enter a valid email address';
            }
        } else if (name === 'password') {
            if (value === '') {
                error = 'Password is required';
            }

            // else if (!validatePassword(value)) {
            //     error = 'Password must be at least 6 characters long';
            // }
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.ONBOARDING)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleForgetPassNavigation = () => {
        resetNavigation(navigation, SCREENS.FORGET_PASSWORD)
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleLogin = () => {
        const { email, password } = form;
        let valid = true;
        let newErrors = { email: '', password: '' };

        if (email === '') {
            newErrors.email = 'Email address is required';
            valid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
            valid = false;
        }

        if (password === '') {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 6 characters long';
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
                    resetNavigation(navigation, SCREENS.ONBOARDING)
                }}
                style={styles.backButton}>

                <Icon name={'arrow-back'} size={28} color={theme.dark.secondary} />

            </TouchableOpacity>
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Welcome back 👋🏼
                    </Text>
                    <Text style={styles.subTitle}>
                        Please enter your email & Password to sign in
                    </Text>
                    <CustomTextInput
                        label={'Email Address'}
                        identifier={'email'}
                        value={form.email}
                        onValueChange={(value) => handleChange('email', value)}
                        mainContainer={{ marginTop: 20 }}
                        leftIcon={<EmailIcon
                            style={{
                                marginHorizontal: 8

                            }} name="email" size={20}
                            color={theme.dark.text} />}
                    />
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                    <CustomTextInput
                        label={'Password'}
                        identifier={'password'}
                        value={form.password}
                        secureTextEntry={!showPassword}
                        onValueChange={(value) => handleChange('password', value)}
                        leftIcon={<MaterialCommunityIcons
                            style={{
                                marginHorizontal: 8

                            }} name="lock" size={20}
                            color={theme.dark.text} />}
                        mainContainer={{ marginTop: 15 }}
                        iconComponent={
                            <MaterialCommunityIcons
                                onPress={() => {
                                    setShowPassword(!showPassword)
                                }}
                                style={{
                                    marginEnd: 8

                                }} name={!showPassword ? "eye" : "eye-off"} size={20}
                                color={theme.dark.text} />
                        }
                    />
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    <View style={styles.forgetPassContainer}>

                        <View style={{ flex: 1 }}>
                            <CheckBox label={"Remember Me"} />
                        </View>

                        <TouchableOpacity onPress={() => {
                            handleForgetPassNavigation();
                        }}>
                            <Text style={styles.forgetText}>
                                Forget Password?
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <HorizontalDivider
                        customStyle={{
                            marginTop: 40
                        }} />

                    <TouchableOpacity
                        onPress={() => {
                            resetNavigation(navigation, SCREENS.SIGNUP)
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


                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            handleLogin();
                        }}
                        title={'Log In'}
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
        marginHorizontal: 5
    },
    createAccountItem: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 30,
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: scaleHeight(120)
    },
    createAccountView: {
        flex: 1
    },
    forgetPassContainer: {
        flexDirection: 'row',
        marginTop: 20,
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


export default Login;
