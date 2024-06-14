import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Pressable,
    Alert,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';

import SwipeableFlatList from 'react-native-swipeable-list';
import { blockUserChat, deleteChat, homeLogo, reportChat, searchServices } from '../../../assets/images';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import { theme } from '../../../assets';
import fonts from '../../../styles/fonts';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';



const darkColors = {
    background: '#121212',
    primary: '#BB86FC',
    primary2: '#3700b3',
    secondary: '#03DAC6',
    onBackground: '#FFFFFF',
    error: '#CF6679',
};

const colorEmphasis = {
    high: 0.87,
    medium: 0.6,
    disabled: 0.38,
};

const extractItemKey = item => {
    return item.id.toString();
};



function renderItemSeparator() {
    return <View style={styles.itemSeparator} />;
}

const contacts = [
    {
        name: 'Raphael',
        subject: 'amet lorem semper auctor. Mauris vel turpis.',
        date: 'Sun, 17th, 2019',
        text: 'How are you today?',
        id: 1,
        time: '2 min ago',
        count: 3,
        avatarUrl: 'https://i.pravatar.cc/300'
    },
    {
        name: 'Aquila',
        subject: 'quis, pede. Praesent',
        date: 'Thu, 11th, 2019',
        text: 'Don’t miss to attend the meeting.',
        id: 11,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/400'
    },
    {
        name: 'Geraldine',
        subject: 'purus sapien, gravida non,',
        date: 'Tue, 24th, 2019',
        text: 'Hey! Can you join the meeting?',
        id: 21,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/500'
    },
    {
        name: 'Geraldine',
        subject: 'nec enim. Nunc ut erat. Sed nunc',
        date: 'Thu, 5th, 2020',
        text: 'How are you today?',
        id: 31,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/700'
    },
    {
        name: 'Mariko',
        subject: 'lobortis mauris. Suspendisse',
        date: 'Sat, 25th, 2019',
        text: 'Have a good day 🌸',
        id: 41,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/900'
    },
    {
        name: 'Nicole',
        subject: 'egestas.',
        date: 'Tue, 8th, 2020',
        text: 'How are you today?',
        id: 51,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/800'
    },
    {
        name: 'Solomon',
        subject: 'ac mattis ornare, lectus',
        date: 'Fri, 10th, 2019',
        text: 'How are you today?',
        id: 61,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/10'
    },
    {
        name: 'Diana',
        subject: 'Suspendisse',
        date: 'Sun, 16th, 2018',
        text: 'How are you today?',
        id: 71,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/250'
    },
    {
        name: 'Hammett',
        subject: 'eu enim. Etiam imperdiet dictum',
        date: 'Mon, 11th, 2019',
        text: 'How are you today?',
        id: 81,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/88'
    },
    {
        name: 'Brenna',
        subject: 'neque. Sed eget lacus. Mauris non',
        date: 'Wed, 22nd, 2019',
        text: 'How are you today?',
        id: 91,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/55'
    },
    {
        name: 'Zelda',
        subject: 'enim non nisi.',
        date: 'Sat, 27th, 2020',
        text: 'How are you today?',
        id: 101,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/66'
    },
    {
        name: 'Irene',
        subject: 'aptent taciti sociosqu ad litora torquent per',
        date: 'Wed, 8th, 2020',
        text: 'Have a good day 🌸',
        id: 111,
        time: "2 min ago",
        count: 0,
        avatarUrl: 'https://i.pravatar.cc/77'
    },
];


const Chat = ({ navigation }) => {


    const archiveItem = itemId => {
        Alert.alert(
            'DISHONESTY ALERT',
            "Not gonna Archive it. We're actually are gonna just delete it.",
            [
                {
                    text: 'Just delete it?',
                    //onPress: () => deleteItem(itemId),
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
        );
    };

    const snoozeItem = itemId => {
        Alert.alert(
            'DISHONESTY ALERT',
            "Not gonna Snooze it. We're actually are gonna just delete it.",
            [
                {
                    text: 'Just delete it?',
                    //onPress: () => deleteItem(itemId),
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
        );
    };

    const QuickActions = (index, qaItem) => {
        return (
            <View style={styles.qaContainer}>
                <TouchableOpacity
                    style={styles.swiperButton}
                    onPress={() => {

                    }}>
                    <Image
                        style={{ width: 36, height: 36, marginTop: 25, marginLeft: 20 }}
                        source={blockUserChat} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.swiperButton}
                    onPress={() => {

                    }
                    }>
                    <Image
                        style={{ width: 36, height: 36, marginTop: 25, marginLeft: 20 }}
                        source={reportChat} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.swiperButton}
                    onPress={() => {

                    }}>
                    <Image
                        style={{ width: 36, height: 36, marginTop: 25, marginLeft: 20 }}
                        source={deleteChat} />
                </TouchableOpacity>

            </View>
        );
    };

    const Item = ({ item, backgroundColor, textColor, deleteItem }) => {
        return (
            <TouchableOpacity 
            activeOpacity={1}

            onPress={() => {
                resetNavigation(navigation, SCREENS.GENERAL_CHAT)
            }}>
                <View style={styles.item}>
                    <View style={styles.avatar}>
                        <Image source={{ uri: item.avatarUrl }} style={styles.avatarImage} />
                        <View style={styles.greenDot} />
                    </View>
                    <View style={styles.messageContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.name} numberOfLines={1}>
                                {item.name}
                            </Text>
                            <Text style={styles.time}>
                                {'2 min ago'}
                            </Text>
                        </View>
                        {/* <Text style={styles.subject} numberOfLines={1}>
                            Subject: {item.subject}
                        </Text> */}
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>
                                {item.text}
                            </Text>
                            {item.count > 0 && (
                                <View style={{
                                    backgroundColor: theme.dark.secondary,
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={styles.count}>
                                        {item.count}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {/* <View /> */}
            </TouchableOpacity>
        );
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Image style={{
                        width: scaleWidth(30),
                        height: scaleHeight(35),
                        alignSelf: 'center',
                        left: scaleWidth(30)
                    }} source={homeLogo} />
                    <Text style={styles.headerText}>Chat</Text>
                    <TouchableOpacity onPress={() => {
                        resetNavigation(navigation, SCREENS.SEARCH_SERVICES)
                    }}>
                        <Image style={{
                            width: scaleWidth(27),
                            height: scaleHeight(27),
                            alignSelf: 'center',
                            right: scaleWidth(30)
                        }} source={searchServices} />
                    </TouchableOpacity>
                </View>
                <SwipeableFlatList
                    keyExtractor={extractItemKey}
                    data={contacts}
                    renderItem={({ item }) => (
                        <Item item={item} />
                    )}
                    maxSwipeDistance={240}
                    renderQuickActions={({ index, item }) => QuickActions(index, item)}
                    contentContainerStyle={styles.contentContainerStyle}
                    shouldBounceOnMount={true}
                //ItemSeparatorComponent={renderItemSeparator}
                />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.dark.primary,
    },
    headerContainer: {
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 26,
        fontFamily: fonts.fontsType.semiBold,
        color: theme.dark.secondary,
    },
    item: {
        backgroundColor: theme.dark.primary,
        // height: 80,
        flexDirection: 'row',
        padding: 10,
    },
    messageContainer: {
        flex: 1
    },
    name: {
        fontSize: 16,
        color: theme.dark.white,
        fontFamily: fonts.fontsType.medium,
        flex: 1
    },
    time: {
        fontSize: 12,
        color: theme.dark.inputLabel,
        fontFamily: fonts.fontsType.regular,
    },
    subject: {
        fontSize: 14,
        color: darkColors.onBackground,
        opacity: colorEmphasis.high,
        fontWeight: 'bold',
        textShadowColor: darkColors.secondary,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    text: {
        fontSize: 13,
        color: theme.dark.inputLabel,
        fontFamily: fonts.fontsType.light,
        flex: 1
    },
    count: {
        fontSize: 11,
        color: theme.dark.primary,
        fontFamily: fonts.fontsType.medium,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 7,
        alignSelf: 'center',
    },
    avatarImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
        alignSelf: 'center'
    },
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: darkColors.onBackground,
        opacity: colorEmphasis.medium,
    },
    qaContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginEnd: scaleWidth(20),
    },
    swiperButton: {
        alignSelf: 'center',
        marginBottom: scaleHeight(15)
    },
    button: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        opacity: colorEmphasis.high,
    },
    button1Text: {
        color: darkColors.primary,
    },
    button2Text: {
        color: darkColors.secondary,
    },
    button3Text: {
        color: darkColors.error,
    },
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: theme.dark.primary,
    },
    greenDot: {
        position: 'absolute',
        bottom: 2,
        right: 0,
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#00CD46',
    },
});

export default Chat;