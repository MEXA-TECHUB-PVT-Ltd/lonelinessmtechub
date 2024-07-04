import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAuth } from '../providers/AuthProvider';
import { useSelector, useDispatch } from 'react-redux';

const Root = () => {
    const { token, userProfile } = useSelector((state) => state.auth);
    //const { isLoggedIn, userRole } = useAuth();
    //console.log(isLoggedIn, userRole)
    console.log('token', token, userProfile)
    return (
        <NavigationContainer>

            {token ? <MainStack /> : <AuthStack />}

        </NavigationContainer>
    );
};


export default Root;
