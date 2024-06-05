import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    About,
    AddLocation,
    BirthDate,
    EnableLocation,
    ForgetPassword,
    GenderLooking,
    Login,
    Onboarding,
    PhoneNumber,
    ProfilePicture,
    ResetPassword,
    SelectGender,
    Signup,
    UserName,
    VerifyEmail,
    YourInteresets
} from '..';
import { SCREENS } from '../constant/constants';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.ONBOARDING} component={Onboarding} />
            <Stack.Screen name={SCREENS.LOGIN} component={Login} />
            <Stack.Screen name={SCREENS.FORGET_PASSWORD} component={ForgetPassword} />
            <Stack.Screen name={SCREENS.VERIFY_EMAIL} component={VerifyEmail} />
            <Stack.Screen name={SCREENS.RESET_PASSWORD} component={ResetPassword} />
            <Stack.Screen name={SCREENS.SIGNUP} component={Signup} />
            <Stack.Screen name={SCREENS.USER_NAME} component={UserName} />
            <Stack.Screen name={SCREENS.PHONE_NUMBER} component={PhoneNumber} />
            <Stack.Screen name={SCREENS.PROFILE_PICTURE} component={ProfilePicture} />
            <Stack.Screen name={SCREENS.ABOUT} component={About} />
            <Stack.Screen name={SCREENS.BIRTH_DATE} component={BirthDate} />
            <Stack.Screen name={SCREENS.GENDER_SELECTION} component={SelectGender} />
            <Stack.Screen name={SCREENS.GENDER_LOOKING} component={GenderLooking} />
            <Stack.Screen name={SCREENS.YOUR_INTERESETS} component={YourInteresets} />
            <Stack.Screen name={SCREENS.ENABLE_LOCATION} component={EnableLocation} />
            <Stack.Screen name={SCREENS.ADD_LOCATION} component={AddLocation} />
        </Stack.Navigator>
    );
}

export default AuthStack;