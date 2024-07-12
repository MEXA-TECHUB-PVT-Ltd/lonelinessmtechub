import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabBar';
import { SCREENS } from '../constant/constants';
import { BuddySendRequest, BuddyServiceDetails, GeneralChat, ImageViewer, NotificationSetting, Notifications, PaymentCancellation, Premium, RateBuddy, Rating, ReportBuddy, SearchServices, SendRequest, ServiceDetails, UserServiceDetails } from '..'


const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.MAIN_DASHBOARD} component={BottomTabNavigator} />
            <Stack.Screen name={SCREENS.SEND_REQUEST} component={SendRequest} />
            <Stack.Screen name={SCREENS.IMAGE_VIEWER} component={ImageViewer} />
            <Stack.Screen name={SCREENS.RATING} component={Rating} />
            <Stack.Screen name={SCREENS.PREMIUM} component={Premium} />
            <Stack.Screen name={SCREENS.NOTIFICATION} component={Notifications} />
            <Stack.Screen name={SCREENS.NOTIFICATION_SETTING} component={NotificationSetting} />
            <Stack.Screen name={SCREENS.SERVICE_DETAILS} component={ServiceDetails} />
            <Stack.Screen name={SCREENS.BUDDY_SEND_REQUEST} component={BuddySendRequest} />
            <Stack.Screen name={SCREENS.SEARCH_SERVICES} component={SearchServices} />
            <Stack.Screen name={SCREENS.USER_SERVICE_DETAIL} component={UserServiceDetails} />
            <Stack.Screen name={SCREENS.REPORT_BUDDY} component={ReportBuddy} />
            <Stack.Screen name={SCREENS.BUDDY_SERVICE_DETAIL} component={BuddyServiceDetails} />
            <Stack.Screen name={SCREENS.PAYMENT_CANCELLATION} component={PaymentCancellation} />
            <Stack.Screen name={SCREENS.GENERAL_CHAT} component={GeneralChat} />
            <Stack.Screen name={SCREENS.RATE_BUDDY} component={RateBuddy} />
        </Stack.Navigator>
    );
};

export default MainStack;
