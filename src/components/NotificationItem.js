// NotificationComponent.js

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import fonts from '../styles/fonts';
import { scaleHeight } from '../styles/responsive';
import { theme } from '../assets';

const NotificationItem = ({ image, title, description, time }) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <View style={styles.notificationContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
            {/* <Image source={require('./arrow.png')} style={styles.arrow} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
       // padding: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 10,
    },
    notificationContent: {
        flex: 1,
    },
    title: {
        fontSize: scaleHeight(17),
        fontFamily: fonts.fontsType.semiBold,
        marginBottom: 5,
        color: theme.dark.white,
        marginTop:scaleHeight(20)
    },
    description: {
        fontSize: scaleHeight(14),
        fontFamily: fonts.fontsType.regular,
        marginBottom: 5,
        color: theme.dark.inputLabel,
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    arrow: {
        width: 20,
        height: 20,
        tintColor: '#999',
    },
});

export default NotificationItem;
