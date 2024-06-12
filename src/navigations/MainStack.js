import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabBar';
import { SCREENS } from '../constant/constants';
import { BuddySendRequest, ImageViewer, NotificationSetting, Notifications, Premium, Rating, SendRequest, ServiceDetails } from '..'


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
        </Stack.Navigator>
    );
};

export default MainStack;
