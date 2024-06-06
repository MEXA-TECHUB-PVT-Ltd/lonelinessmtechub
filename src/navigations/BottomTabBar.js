import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTabBar from '../components/CustomBottomTabBar';
import { chatIcon, homeIcon, profileIcon, servicesIcon } from '../assets/images';
import { SCREENS } from '../constant/constants';
import {
    Chat,
    Home,
    Profile,
    Services
} from '..';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const icons = [homeIcon, servicesIcon, chatIcon, profileIcon];


    return (
        <Tab.Navigator tabBar={(props) => <CustomBottomTabBar {...props} icons={icons} />}>
            <Tab.Screen name={SCREENS.HOME}
                component={Home}
                options={{
                    headerShown: false,
                    title: "Home",
                }} />
            <Tab.Screen name={SCREENS.SERVICES} component={Services}
                options={{
                    headerShown: false,
                    title: "Services",
                }} />
            <Tab.Screen name={SCREENS.CHAT} component={Chat}
                options={{
                    headerShown: false,
                    title: "Chat",
                }} />
            <Tab.Screen name={SCREENS.PROFILE} component={Profile}
                options={{
                    headerShown: false,
                    title: "Profile",
                }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
