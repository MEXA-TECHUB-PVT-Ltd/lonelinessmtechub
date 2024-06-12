import React, { useEffect } from 'react';
import { Dimensions, Text, StyleSheet, Image, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useAlert } from '../providers/AlertContext';
import { success_alert_img, error_alert_img } from '../assets/images';
import { theme } from '../assets';
import { scaleHeight, scaleWidth } from '../styles/responsive';

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

    const getShadowStyle = () => {
        switch (alert.type) {
            case 'success':
                return styles.successShadow;
            case 'error':
                return styles.errorShadow;
            // case 'warning':
            //     return styles.warningShadow;
            default:
                return {};
        }
    };

    return (
        <Animatable.View
            animation="slideInDown"
            duration={500}
            style={[styles.container, styles[alert.type], getShadowStyle()]}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <Image source={getImageSource()} style={styles.icon} />
                <Text style={styles.text}>{alert.message}</Text>
            </View>
            <Text style={[styles.text, { marginLeft: scaleWidth(30) }]}>{alert.description}</Text>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: width * 0.03,
        margin: width * 0.04,
        borderRadius: 5,
        zIndex: 1000,
        backgroundColor: theme.dark.primary,
        borderWidth: 0.5,
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
        top: scaleHeight(10)
    },
    success: {
        borderColor: '#4CAF50',
    },
    error: {
        borderColor: '#F44336',
    },
    successShadow: {
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    errorShadow: {
        shadowColor: '#F44336',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    // Add other shadow styles as needed
});

export default DynamicAlert;
