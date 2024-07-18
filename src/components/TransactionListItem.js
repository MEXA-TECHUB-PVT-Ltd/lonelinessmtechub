import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../assets';
import { scaleHeight, scaleWidth } from '../styles/responsive';
import { dummyImg } from '../assets/images';
import fonts from '../styles/fonts';
import moment from 'moment';
import * as Animatable from 'react-native-animatable'


const TransactionListItem = ({ item, index }) => {
    return (
        <Animatable.View
            // animation={'fadeInUpBig'}
            // animation={'zoomInLeft'}
            animation={'fadeInUp'}
            duration={1000}
            delay={index * 300}
            style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    resizeMode='cover'
                    style={styles.image}
                    source={{ uri: item?.images[0]?.image_url }}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.genderText}>{moment(item?.created_at).format('dddd, hh:mm A')}</Text>
                <Text style={[styles.nameText]}>{item?.full_name}</Text>
            </View>
            <Text style={[styles.nameText, {
                alignSelf: 'center',
                marginEnd: 10,
                fontSize: scaleHeight(15),
            }]}>{`$${item?.amount}`}</Text>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.dark.inputBg,
        flexDirection: 'row',
        borderRadius: 10,
        padding: 6,
        marginTop: 10,
        borderColor: theme.dark.inputLabel,
        borderWidth: 1
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: (50 / 2),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: (50 / 2),
    },
    textContainer: {
        marginHorizontal: 10,
        marginTop: 5,
        flex: 1,
    },
    nameText: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(17),
        color: theme.dark.white,
    },
    genderText: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(13),
        color: theme.dark.inputLabel,
    },
    icon: {
        alignSelf: 'center',
    },
});

export default TransactionListItem;
