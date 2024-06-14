import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { SCREENS } from '../../../../constant/constants';
import { resetNavigation } from '../../../../utils/resetNavigation';
import Button from '../../../../components/ButtonComponent';
import Header from '../../../../components/Header';
import { theme } from '../../../../assets';
import fonts from '../../../../styles/fonts';
import useBackHandler from '../../../../utils/useBackHandler';
import { curveBg } from '../../../../assets/images';
import { useAlert } from '../../../../providers/AlertContext';

const reportReasons = ["Report for no reason", "Commercial profile", "Scam", "Fake Profile", "Inappropriate picture", "Bad behaviour", "Other"];

const ReportBuddy = ({ navigation }) => {
    const { showAlert } = useAlert();
    const [selectedReason, setSelectedReason] = useState(null);

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.USER_SERVICE_DETAIL)
        return true;
    };
    useBackHandler(handleBackPress);

    const renderItem = ({ item }) => {
        const isSelected = selectedReason === item;
        return (
            <TouchableOpacity
                onPress={() => setSelectedReason(item)}
                activeOpacity={0.8}
                style={[
                    styles.item,
                    {
                        backgroundColor: isSelected ? theme.dark.transparentBg : theme.dark.inputBg,
                        borderColor: isSelected ? theme.dark.secondary : theme.dark.inputLabel,
                    }
                ]}
            >
                <Text style={[
                    styles.itemText,
                    { color: isSelected ? theme.dark.secondary : theme.dark.inputLabel }
                ]}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    };

    const handleButtonClick = () => {
        showAlert("Success", 'success', "Buddy Reported Successfully.")
        setTimeout(() => {
            resetNavigation(navigation, SCREENS.USER_SERVICE_DETAIL)
        }, 3000);

    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                style={{
                    flex: 1
                }}
                source={curveBg}>
                <Header
                    onPress={() => {
                        handleBackPress();
                    }}
                />
                <Text style={styles.headerText}>Tell us the reason why are you reporting Alex?</Text>
                <Text style={styles.subHeaderText}>You will no longer see this person or receive any message from them. Let us know what happened.</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        data={reportReasons}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item + index}
                    />
                    <Button
                        onPress={() => {
                            handleButtonClick()
                        }}
                        title={'Report'}
                        customStyle={{ marginBottom: 0 }}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme.dark.primary,
        flex: 1,
    },
    headerText: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: 18,
        color: theme.dark.white,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
        width: '90%',
    },
    subHeaderText: {
        fontFamily: fonts.fontsType.light,
        fontSize: 15,
        color: theme.dark.inputLabel,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
        width: '90%',
    },
    listContainer: {
        padding: 20,
        marginTop: '2%',
        flex: 2,
    },
    item: {
        marginVertical: 8,
        height: 45,
        overflow: 'hidden',
        borderRadius: 40,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemText: {
        fontFamily: fonts.fontsType.medium,
        fontSize: 14,
        marginHorizontal: 15,
    }
});

export default ReportBuddy;
