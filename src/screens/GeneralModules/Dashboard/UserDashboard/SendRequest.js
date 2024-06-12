import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { SCREENS } from '../../../../constant/constants';
import CustomLayout from '../../../../components/CustomLayout';
import fonts from '../../../../styles/fonts';
import { scaleHeight } from '../../../../styles/responsive';
import HorizontalDivider from '../../../../components/HorizontalDivider';
import Button from '../../../../components/ButtonComponent';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { theme } from '../../../../assets';
import useBackHandler from '../../../../utils/useBackHandler';
import { resetNavigation } from '../../../../utils/resetNavigation';
import CategoryList from '../../../../components/CategoryList';
import { bellHome, filterHome, homeLogo, likeHome } from '../../../../assets/images';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../../../components/TextInputComponent';

const categories = [
    { id: '1', text: 'Date', image: bellHome },
    { id: '2', text: 'Lunch', image: filterHome },
    { id: '3', text: 'Dinner', image: homeLogo },
    { id: '4', text: 'Movies', image: likeHome },
];

const SendRequest = ({ navigation }) => {
    const [form, setForm] = useState({ day: '', month: '', year: '' });
    const [errors, setErrors] = useState({ birthDate: '' });


    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
        return true;
    };
    useBackHandler(handleBackPress);

    const handleCategoryPress = (item) => {
        console.log('Category pressed:', item);
    };

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });

        if (name === 'day' && value.length === 2) {
            monthRef.current.focus();
        } else if (name === 'month' && value.length === 2) {
            yearRef.current.focus();
        }

        let error = '';
        if (name === 'birthDate') {
            if (value === '') {
                error = 'Birthdate is required';
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleKeyPress = (name, key) => {
        if (key === 'Backspace') {
            if (name === 'month' && form.month === '') {
                dayRef.current.focus();
            } else if (name === 'year' && form.year === '') {
                monthRef.current.focus();
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
                }}
                style={styles.backButton}>

                <Icon name={'arrow-back'} size={28} color={theme.dark.secondary} />

            </TouchableOpacity>
            <CustomLayout >
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Send Request
                    </Text>
                    <Text style={styles.subTitle}>
                        You're just one step away from getting the service you want.
                    </Text>

                    <Text style={styles.categoryText}>
                        Select Category
                    </Text>

                    <CategoryList categories={categories} onPress={handleCategoryPress} />
                    <Text style={styles.label}>{"Date of Services"}</Text>
                    <View style={styles.inputContainerStyle}>

                        <TextInput
                            ref={dayRef}
                            placeholder='DD'
                            placeholderTextColor={theme.dark.inputLabel}
                            maxLength={2}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                            value={form.day}
                            onChangeText={(value) => handleChange('day', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('day', nativeEvent.key)}
                        />

                        <View style={styles.verticleLine}></View>

                        <TextInput
                            ref={monthRef}
                            placeholder='MM'
                            placeholderTextColor={theme.dark.inputLabel}
                            maxLength={2}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                            value={form.month}
                            onChangeText={(value) => handleChange('month', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('month', nativeEvent.key)}
                        />

                        <View style={styles.verticleLine}></View>

                        <TextInput
                            ref={yearRef}
                            placeholder='YYYY'
                            placeholderTextColor={theme.dark.inputLabel}
                            maxLength={4}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                            value={form.year}
                            onChangeText={(value) => handleChange('year', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('year', nativeEvent.key)}
                        />

                    </View>


                    <Text style={styles.label}>{"Time of Services"}</Text>
                    <View style={styles.inputContainerStyle}>

                        <TextInput
                            ref={dayRef}
                            placeholder='12'
                            placeholderTextColor={theme.dark.inputLabel}
                            maxLength={2}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                            value={form.day}
                            onChangeText={(value) => handleChange('day', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('day', nativeEvent.key)}
                        />

                        <Text style={[styles.label, { top: 0 }]}>{":"}</Text>

                        <TextInput
                            ref={monthRef}
                            placeholder='00'
                            placeholderTextColor={theme.dark.inputLabel}
                            maxLength={2}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                            value={form.month}
                            onChangeText={(value) => handleChange('month', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('month', nativeEvent.key)}
                        />

                        <Text style={[styles.label, { top: 0 }]}>{":"}</Text>

                        <TextInput
                            ref={yearRef}
                            placeholder='PM'
                            placeholderTextColor={theme.dark.inputLabel}
                            maxLength={2}
                            //keyboardType='number-pad'
                            style={styles.inputStyle}
                            value={form.year}
                            onChangeText={(value) => handleChange('year', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('year', nativeEvent.key)}
                        />

                    </View>

                    <CustomTextInput
                        label={'No. of Hours'}
                        identifier={'hours'}
                        value={form.email}
                        onValueChange={(value) => handleChange('hours', value)}
                        mainContainer={{ marginTop: 10 }}
                    />

                    <CustomTextInput
                        label={'Location'}
                        identifier={'location'}
                        value={form.location}
                        onValueChange={(value) => handleChange('location', value)}
                        mainContainer={{ marginTop: 10 }}
                    />


                </View>


                <View style={styles.buttonContainer}>
                    <HorizontalDivider
                        customStyle={{
                            marginTop: 10
                        }} />
                    <Button
                        onPress={() => {

                        }}
                        title={'Send Request'}
                        customStyle={{
                            marginBottom:scaleHeight(20)
                        }}
                    />
                </View>

            </CustomLayout>

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
        flex: 1
    },
    welcomeText: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(26),
        color: theme.dark.white,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(14),
        color: theme.dark.white,
        marginTop: 5
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: scaleHeight(-20)
    },
    backButton: {
        paddingHorizontal: 25,
        marginTop: 10
    },

    categoryText: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(16),
        color: theme.dark.inputLabel,
        marginTop: 20
    },
    verticleLine: {
        height: '60%',
        width: 1,
        backgroundColor: '#909090',
    },
    inputStyle: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(18),
        color: theme.dark.inputLabel,
        textAlign: 'center',
        flex: 1
    },
    inputContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.dark.inputBg,
        marginTop: scaleHeight(30),
        height: scaleHeight(50),
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.dark.text,
        justifyContent: 'space-evenly'
    },
    label: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(17),
        color: theme.dark.inputLabel,
        marginHorizontal: 8,
        top: 18
    }

});


export default SendRequest;

