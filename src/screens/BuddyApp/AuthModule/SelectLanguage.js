import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import useBackHandler from '../../../utils/useBackHandler';
import { theme } from '../../../assets';
import CustomLayout from '../../../components/CustomLayout';
import fonts from '../../../styles/fonts';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import HorizontalDivider from '../../../components/HorizontalDivider';
import Button from '../../../components/ButtonComponent';
import ProfileProgressBar from '../../../components/ProfileProgressBar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CheckBox from '../../../components/CheckboxComponent';

const SelectLanguage = ({ navigation }) => {
    const languages = [
        {
            name: "English",
        },
        {
            name: "Spanish",
        },
        {
            name: "Chinese",
        }
        ,
        {
            name: "French",
        }
        ,
        {
            name: "German",
        },

        {
            name: "Japanese",
        },

        {
            name: "Korean",
        }
        ,

        {
            name: "Italian",
        }
        ,

        {
            name: "Portuguese",
        }
        ,

        {
            name: "Russian",
        }
    ]

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.HEIGHT_WEIGHT)
        return true;
    };
    useBackHandler(handleBackPress);

    const renderLanguages = ({ item, index }) => {
        return <TouchableOpacity
            key={index}
            onPress={() => {

            }}

            style={{


            }}>

            <View style={{ flexDirection: 'row', }}>

                <Text style={{
                    color: theme.dark.white,
                    fontFamily: fonts.fontsType.regular,
                    fontSize: scaleHeight(16),
                    marginHorizontal: 10,
                    flex: 1,
                    alignSelf: 'center'
                }}>
                    {item?.name}
                </Text>

                <CheckBox />

            </View>

            <HorizontalDivider
                customStyle={{
                    marginTop: 15,
                }} />

        </TouchableOpacity>
    }


    return (
        <SafeAreaView style={styles.container}>
            <ProfileProgressBar progress={80} onPress={() => {
                resetNavigation(navigation, SCREENS.HEIGHT_WEIGHT)
            }} />

            <View style={styles.contentContainer}>
                <Text style={styles.welcomeText}>
                    Select Language
                </Text>
                <Text style={styles.subTitle}>
                    Pick the language that suits you best!
                </Text>


                <View style={{
                    flexDirection: 'row',
                    marginBottom: scaleHeight(20),
                    alignSelf: 'center',
                    marginTop: scaleHeight(40)
                }}>

                    <View style={{
                        width: '100%',
                        height: scaleHeight(42),
                        borderRadius: 20,
                        borderWidth: 0.5,
                        borderColor: 'white',
                        backgroundColor: 'transparent',
                        marginHorizontal: 10,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name={'search'} size={22} color={theme.dark.white} style={{ marginHorizontal: 8 }} />

                        <TextInput
                            placeholder='Search here'
                            placeholderTextColor={theme.dark.white}
                            style={{
                                fontFamily: fonts.fontsType.light,
                                fontSize: scaleHeight(14),
                                color: theme.dark.white,
                                flex: 1,


                            }} />
                    </View>

                </View>

                <View style={{ height: scaleHeight(450) }}>
                    <FlatList
                        data={languages}
                        renderItem={renderLanguages}
                        extraData={(index) => index}
                    />
                </View>



                <View style={styles.buttonContainer}>

                    {/* <HorizontalDivider
                        customStyle={{

                        }} /> */}

                    <Button
                        onPress={() => {
                            //handleUserName();
                            resetNavigation(navigation, SCREENS.BUDDY_YOUR_INTERESTS)
                        }}
                        title={'Continue'}
                        customStyle={{
                            width: '100%'
                        }}
                    />
                </View>


            </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.background
    },
    contentContainer: {
        padding: 25,

    },
    welcomeText: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(22),
        color: theme.dark.white,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(14),
        color: theme.dark.heading,
        marginTop: 5
    },
    forgetText: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(14),
        color: theme.dark.secondary,
        alignSelf: 'center'
    },
    createAccountText1: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(16),
        color: theme.dark.white
    },
    createAccountText2: {
        fontFamily: fonts.fontsType.bold,
        fontSize: scaleHeight(16),
        color: theme.dark.secondary,
        marginHorizontal: 5,
        textDecorationLine: 'underline'
    },
    createAccountItem: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 30,
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: scaleHeight(10),
        // marginBottom: scaleHeight(-40)
    },
    createAccountView: {
        flex: 1
    },
    forgetPassContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    backButton: {
        alignSelf: 'center'
    },
    errorText: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(12),
        color: theme.dark.error,
        marginTop: 5,
        marginHorizontal: 8
    },
});


export default SelectLanguage;
