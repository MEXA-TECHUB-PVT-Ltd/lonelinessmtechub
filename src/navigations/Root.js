import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAuth } from '../providers/AuthProvider';

const Root = () => {
    const { isLoggedIn, userRole } = useAuth();
    console.log(isLoggedIn, userRole)
    return (
        <NavigationContainer>

            {isLoggedIn ? <MainStack /> : <AuthStack />}

        </NavigationContainer>
    );
};


export default Root;
