import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../assets';
import Spinner from './Spinner';
import { scaleHeight, scaleWidth } from '../styles/responsive';
import fonts from '../styles/fonts';

const FullScreenLoader = ({ loading, title }) => {
    return (
        loading && <View style={styles.container}>

            <Spinner
                isTimer={false}
                lottieCustomStyle={{
                    width: scaleWidth(150),
                    height: scaleHeight(150),
                }} />
            {title && <Text style={styles.titleStyle}>{title}</Text>}
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
    titleStyle: {
        fontSize: scaleHeight(16),
        fontFamily: fonts.fontsType.regular,
        color: theme.dark.white,
        position: 'absolute',
        bottom: scaleHeight(270)
    },
});

export default FullScreenLoader;
