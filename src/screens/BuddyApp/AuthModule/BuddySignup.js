import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
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
import ProfileProgressBar from '../../../components/ProfileProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../../redux/AuthModule/signupSlice';
import { useAlert } from '../../../providers/AlertContext';

const BuddySignup = ({ navigation }) => {
    const dispatch = useDispatch();
    const { showAlert } = useAlert();
    const { dataPayload } = useSelector((state) => state.app)
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPass] = useState(false);

    console.log(dataPayload);

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

        else if (name === 'confirmPassword') {
            if (value === '') {
                error = 'Confirm Password is required';
            }

            // else if (!validatePassword(value)) {
            //     error = 'Password must be at least 6 characters long';
            // }
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.ROLE_SELECTOR)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleLoginNavigation = () => {
        resetNavigation(navigation, SCREENS.LOGIN)
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSignup = () => {
        const { email, password, confirmPassword } = form;
        let valid = true;
        let newErrors = { email: '', password: '', confirmPassword: '' };

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

        if (confirmPassword === '') {
            newErrors.confirmPassword = 'Confirm Password is required';
            valid = false;
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Password does not match.';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            const credentials = {
                email: form?.email,
                password: form?.password,
                confirm_password: form?.confirmPassword,
                role: "BUDDY",
            }
            dispatch(signupUser(credentials)).then((result) => {
                if (result?.payload?.status === "success") {
                    handleSuccessNavigation(result?.payload?.message);
                    // success message here.... "message": "User registered successfully",
                } else {
                    showAlert("Error", "error", result?.payload?.message)
                    // error message here.... "message": "User registered failed",
                }
            })
        }
    };

    const handleSuccessNavigation = (message) => {
        showAlert("Success", "success", message)
        setTimeout(() => {
            resetNavigation(navigation, SCREENS.BUDDY_USER_NAME)
        }, 3000);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    resetNavigation(navigation, SCREENS.ROLE_SELECTOR)
                }}
                style={styles.backButton}>

                <Icon name={'arrow-back'} size={28} color={theme.dark.secondary} />

            </TouchableOpacity>
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Create Account 👩🏼‍💻
                    </Text>
                    <Text style={styles.subTitle}>
                        Create account in seconds. We will help you find your perfect match.
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


                    <CustomTextInput
                        label={'Confirm Password'}
                        identifier={'confirmPassword'}
                        value={form.confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        onValueChange={(value) => handleChange('confirmPassword', value)}
                        leftIcon={<MaterialCommunityIcons
                            style={{
                                marginHorizontal: 8

                            }} name="lock" size={20}
                            color={theme.dark.text} />}
                        mainContainer={{ marginTop: 15 }}
                        iconComponent={
                            <MaterialCommunityIcons
                                onPress={() => {
                                    setShowConfirmPass(!showConfirmPassword)
                                }}
                                style={{
                                    marginEnd: 8

                                }} name={!showConfirmPassword ? "eye" : "eye-off"} size={20}
                                color={theme.dark.text} />
                        }
                    />
                    {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

                    {/* <View style={styles.forgetPassContainer}>

                        <View style={{ flex: 1 }}>
                            <CheckBox label={"Remember Me"} />
                        </View>

                    </View> */}
                    <HorizontalDivider
                        customStyle={{
                            marginTop: 40
                        }} />

                    <View
                        style={styles.createAccountItem}
                    >

                        <Text style={styles.createAccountText1}>
                            Already have an account?
                        </Text>

                        <Text
                            onPress={() => {
                                handleLoginNavigation();
                            }}
                            style={styles.createAccountText2}>
                            Log In
                        </Text>

                    </View>



                </View>

            </CustomLayout>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        resetNavigation(navigation, SCREENS.BUDDY_USER_NAME)
                    }}
                    title={'Sign Up'}
                />
            </View>

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
        // marginTop: scaleHeight(50)
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


export default BuddySignup;
