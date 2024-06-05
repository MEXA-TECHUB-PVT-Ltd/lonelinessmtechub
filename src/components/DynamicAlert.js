// DynamicAlert.js

import React, { useEffect } from 'react';
import { Dimensions, Text, StyleSheet, Image, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useAlert } from '../providers/AlertContext';
import { success_alert_img, error_alert_img } from '../assets/images';
import { theme } from '../assets';
import { scaleWidth } from '../styles/responsive';

const { width } = Dimensions.get('window');

const DynamicAlert = () => {
    const { alert, hideAlert } = useAlert();

    useEffect(() => {
        if (alert.visible) {
            const timer = setTimeout(() => {
                hideAlert();
            }, 3000); // Hide after 3 seconds

            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alert.visible]);

    if (!alert.visible) return null;

    const getImageSource = () => {
        switch (alert.type) {
            case 'success':
                return success_alert_img;
            case 'error':
                return error_alert_img;
            // case 'warning':
            //     return require('./assets/warning.png');
            default:
                return null;
        }
    };

    return (
        <Animatable.View
            animation="slideInDown"
            duration={500}
            style={[styles.container, styles[alert.type]]}
        >
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <Image source={getImageSource()} style={styles.icon} />
                <Text style={styles.text}>{alert.message}</Text>
            </View>
            <Text style={styles.text}>{alert.description}</Text>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: width * 0.04,
        margin: width * 0.02,
        borderRadius: 5,
        zIndex: 1000,
        //flexDirection: 'row',
        //alignItems: 'center',
        //justifyContent: 'flex-start',
        backgroundColor: theme.dark.primary,
        borderWidth: 0.5
    },
    text: {
        color: 'white',
        fontSize: width * 0.04,
        marginLeft: width * 0.02,
    },
    descriptionText: {
        color: 'white',
        fontSize: width * 0.02,
        marginLeft: width * 0.02,
    },
    icon: {
        width: width * 0.06,
        height: width * 0.06,
    },
    success: {
        //backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    error: {
        //backgroundColor: '#F44336',
        borderColor: '#F44336',
    },
    warning: {
        backgroundColor: '#FFC107',
    },
});
export default DynamicAlert;
