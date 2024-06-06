import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabBar';


const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainDashboard" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
};

export default MainStack;
