import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../assets';
import Spinner from './Spinner';
import { scaleHeight, scaleWidth } from '../styles/responsive';

const FullScreenLoader = ({ loading }) => {
    return (
        loading && <View style={styles.container}>

            <Spinner
                isTimer={false}
                lottieCustomStyle={{
                    width: scaleWidth(150),
                    height: scaleHeight(150),
                }} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.dark.primary,
    },
});

export default FullScreenLoader;
