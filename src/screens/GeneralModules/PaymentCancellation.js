import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Button from '../../components/ButtonComponent';
import Header from '../../components/Header';


import CustomTextInput from '../../components/TextInputComponent';
import { SCREENS } from '../../constant/constants';
import { resetNavigation } from '../../utils/resetNavigation';
import useBackHandler from '../../utils/useBackHandler';
import { theme } from '../../assets';
import fonts from '../../styles/fonts';
import { scaleHeight } from '../../styles/responsive';

const PaymentCancellation = ({ navigation }) => {

    const [form, setForm] = useState({ about: '' });
    const [errors, setErrors] = useState({ about: '' });


    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });

        let error = '';
        if (name === 'about') {
            if (value === '') {
                error = 'About can not be empty';
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.USER_SERVICE_DETAIL)
        return true;
    };
    useBackHandler(handleBackPress);

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header />
            <Text style={styles.headerText}>Tell us the reason why are you cancelling the payment?</Text>
            <Text style={styles.subHeaderText}>You will no longer see this person or receive any message from them. Let us know what happened.</Text>
            <View style={styles.listContainer}>
                <CustomTextInput
                    label={"Add Reason"}
                    identifier={'about'}
                    value={form.about}
                    onValueChange={(value) => handleChange('about', value)}
                    mainContainer={{}}
                    customInputStyle={{}}
                    customContainerStyle={{}}
                    multiline={true}
                />

            </View>
            <Button
                onPress={() => { }}
                title={'Report'}
                customStyle={{ marginBottom: scaleHeight(30) }}
            />
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

export default PaymentCancellation;
