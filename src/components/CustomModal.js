import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Button from './ButtonComponent';
import { theme } from '../assets';
import fonts from '../styles/fonts';
import { scaleHeight, scaleWidth } from '../styles/responsive';

const CustomModal = ({
    isVisible,
    onClose,
    backdropOpacity = 0.90,
    backdropColor = 'rgba(85, 85, 85, 0.70)',
    animationIn = 'bounceIn',
    animationOut = 'bounceOut',
    animationInTiming = 1000,
    animationOutTiming = 1000,
    imageSource,
    imageStyle,
    text,
    buttonText,
    buttonAction,
    headerTitle,
    isParallelButton,
    parallelButtonText1,
    parallelButtonText2,
    parallelButtonPress1,
    parallelButtonPress2
}) => {
    return (
        <Modal
            backdropOpacity={backdropOpacity}
            backdropColor={backdropColor}
            isVisible={isVisible}
            animationIn={animationIn}
            animationOut={animationOut}
            animationInTiming={animationInTiming}
            animationOutTiming={animationOutTiming}
            onBackdropPress={onClose}
        >
            <View style={styles.modalContainer}>
                {imageSource && (
                    <Image
                        resizeMode='contain'
                        source={imageSource}
                        style={[styles.image, imageStyle]}
                    />
                )}
                {headerTitle && <Text style={styles.headerTitle}>{headerTitle}</Text>}
                {text && <Text style={styles.text}>{text}</Text>}
                {buttonText && buttonAction && !isParallelButton && (
                    <Button
                        title={buttonText}
                        onPress={buttonAction}
                        customStyle={{
                            width: '80%',
                            marginTop: scaleHeight(40)
                        }}
                    />

                )}

                {
                    isParallelButton && <View style={{ flexDirection: 'row', marginTop: scaleHeight(10), }}>
                        <Button
                            title={parallelButtonText1}
                            onPress={parallelButtonPress1}
                            customStyle={{
                                width: '48%',
                                marginHorizontal: '2%',
                                backgroundColor: theme.dark.transparentBg,
                                borderWidth: 1,
                                borderColor: theme.dark.secondary,
                                marginBottom:scaleHeight(0)
                            }}
                            textCustomStyle={{
                                color: theme.dark.secondary
                            }}
                        />

                        <Button
                            title={parallelButtonText2}
                            onPress={parallelButtonPress2}
                            customStyle={{
                                width: '48%',
                                marginBottom:scaleHeight(0)
                            }}
                        />
                    </View>
                }
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#111111',
        width: '90%',
        // height: '50%',
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        marginTop: scaleHeight(-30)
    },
    text: {
        color: theme.dark.inputLabel,
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(16),
        textAlign: 'center',
        marginTop: 10,
        alignSelf: 'center',

    },
    headerTitle: {
        color: theme.dark.white,
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(20),
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: scaleHeight(-15)
    },
});

export default CustomModal;
