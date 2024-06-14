import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import useBackHandler from '../../../utils/useBackHandler';
import { theme } from '../../../assets';
import CustomTextInput from '../../../components/TextInputComponent';
import CustomLayout from '../../../components/CustomLayout';
import fonts from '../../../styles/fonts';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import Button from '../../../components/ButtonComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileProgressBar from '../../../components/ProfileProgressBar';
import Modal from "react-native-modal";
import { alertLogo, successText } from '../../../assets/images';
import Spinner from '../../../components/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../providers/AuthProvider';



const BuddyAddLocation = ({ navigation }) => {
    const { login } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

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
        resetNavigation(navigation, SCREENS.BUDDY_ENABLE_LOCATION)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleLoginNavigation = () => {
        resetNavigation(navigation, SCREENS.ENABLE_LOCATION)
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
            // Proceed with Signup logic
        }
    };

    // Function to store the token and role
    const storeUserCredentials = async (token) => {
        try {
            await AsyncStorage.setItem('userToken', token);
        } catch (e) {
            console.error('Failed to save the user credentials.', e);
        }
    };

    const handleLogin = async () => {
        // Assume loginApi is a function that returns a token and role on successful login
        await storeUserCredentials('test');
        const role = await AsyncStorage.getItem('userRole');
        console.log('rollllllllll', role)
        login('test', role)
    };

    const showHideModal = () => {
        setModalVisible(true);
        // Hide the modal after 3 seconds
        setTimeout(() => {
            setModalVisible(false);
            handleLogin();
            //resetNavigation(navigation, SCREENS.LOGIN)
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


                <Spinner />


            </View>
        </Modal>
    }



    return (
        <SafeAreaView style={styles.container}>
            <ProfileProgressBar title={"Add Location"} progress={50} onPress={() => {
                resetNavigation(navigation, SCREENS.BUDDY_ENABLE_LOCATION)
            }} />
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <CustomTextInput
                        label={'Address'}
                        identifier={'email'}
                        value={form.email}
                        onValueChange={(value) => handleChange('email', value)}
                        mainContainer={{ marginTop: 20 }}
                    />
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                    <CustomTextInput
                        label={'Country'}
                        placeholder={"Select Country"}
                        identifier={'password'}
                        value={form.password}
                        onValueChange={(value) => handleChange('password', value)}
                        mainContainer={{ marginTop: 15 }}
                        iconComponent={
                            <MaterialIcons
                                style={{
                                    marginEnd: 8

                                }} name={"keyboard-arrow-down"} size={24}
                                color={theme.dark.text} />
                        }
                    />
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',

                    }}>

                        <CustomTextInput
                            label={'State'}
                            identifier={'state'}
                            value={form.confirmPassword}
                            onValueChange={(value) => handleChange('confirmPassword', value)}
                            mainContainer={{ marginTop: 15, flex: 1, marginHorizontal: scaleWidth(4) }}
                        />


                        <CustomTextInput
                            label={'Postal Code'}
                            identifier={'postalCode'}
                            value={form.confirmPassword}
                            onValueChange={(value) => handleChange('confirmPassword', value)}
                            mainContainer={{ marginTop: 15, flex: 1, marginHorizontal: scaleWidth(4) }}
                        />



                    </View>


                    <CustomTextInput
                        label={'City'}
                        placeholder={"Select City"}
                        identifier={'confirmPassword'}
                        value={form.confirmPassword}
                        onValueChange={(value) => handleChange('confirmPassword', value)}
                        mainContainer={{ marginTop: 15 }}
                    />
                    {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

                </View>



                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            showHideModal()
                        }}
                        title={'Add Location'}
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
        marginTop: scaleHeight(100),
        marginBottom: scaleHeight(30)
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


export default BuddyAddLocation;
