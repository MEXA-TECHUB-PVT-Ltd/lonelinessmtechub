import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Root = () => {
    return (
        <NavigationContainer>

            {true ? <MainStack /> : <AuthStack />}

        </NavigationContainer>
    );
};


export default Root;
