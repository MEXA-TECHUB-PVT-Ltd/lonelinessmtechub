import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { bellHome, dummy2 } from '../../../../assets/images';
import { theme } from '../../../../assets';
import DetailItem from '../../../../components/DetailItem';
import Button from '../../../../components/ButtonComponent';
import { resetNavigation } from '../../../../utils/resetNavigation';
import { scaleHeight } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import Header from '../../../../components/Header';
import HorizontalDivider from '../../../../components/HorizontalDivider';
import { SCREENS } from '../../../../constant/constants';
import useBackHandler from '../../../../utils/useBackHandler';
import CustomTextInput from '../../../../components/TextInputComponent';
import { TextInput } from 'react-native-gesture-handler';
import { useAlert } from '../../../../providers/AlertContext';
import CustomLayout from '../../../../components/CustomLayout';
import { useDispatch, useSelector } from 'react-redux';
import { requestBackBuddy } from '../../../../redux/BuddyDashboard/requestBackBuddySlice';
import { setRoute } from '../../../../redux/appSlice';

const BuddySendRequest = ({ navigation }) => {
    const dispatch = useDispatch();
    const { currentRoute } = useSelector((state) => state.app)
    const { loading } = useSelector((state) => state.requestBackBuddy)
    const { showAlert } = useAlert();
    const [form, setForm] = useState({
        day: '',
        month: '',
        year: '',
        hours: '',
        minutes: '',
        format: '',
        location: ''
    });

    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const hoursRef = useRef(null);
    const minutesRef = useRef(null);
    const formatRef = useRef(null);

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });

        if (name === 'day' && value.length === 2) {
            monthRef.current.focus();
        } else if (name === 'month' && value.length === 2) {
            yearRef.current.focus();
        }

        if (name === 'hours' && value.length === 2) {
            minutesRef.current.focus();
        } else if (name === 'minutes' && value.length === 2) {
            formatRef.current.focus();
        }


    };

    const handleBackPress = () => {
        const payload = {
            request_id: currentRoute?.request_id,
            route: SCREENS.MAIN_DASHBOARD
        }
        dispatch(setRoute(payload))
        resetNavigation(navigation, currentRoute?.route)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleSendRequest = () => {

        if (form?.location === '') {
            showAlert("Error", "error", "Location is required.")
            return
        }

        if (form?.day === '' && form?.month === '' && form?.year === '') {
            showAlert("Error", "error", "Date of service is required.")
            return
        }

        if (form.hours === '' && form.minutes === '' && form.format === '') {
            showAlert("Error", "error", "Time of service is required.")
            return
        }

        const dateOfService = `${form.year}-${form.month}-${form.day}`;
        const timeOfService = `${form.hours}:${form.minutes}: ${form.format}`;

        const requestBackPayload = {
            request_id: currentRoute?.request_id,
            booking_date: dateOfService,
            booking_time: timeOfService,
            location: form.location
        }

        dispatch(requestBackBuddy(requestBackPayload)).then((result) => {
            if (result?.payload?.status === "success") {
                showAlert("Success", "success", result?.payload?.message)
                setTimeout(() => {
                    handleBackPress();
                }, 3000);
            } else {
                showAlert("Error", "error", result?.payload?.message)
            }
        })



    }

    const handleKeyPress = (name, key) => {
        if (key === 'Backspace') {
            if (name === 'month' && form.month === '') {
                dayRef.current.focus();
            } else if (name === 'year' && form.year === '') {
                monthRef.current.focus();
            }

            if (name === 'minutes' && form.minutes === '') {
                hoursRef.current.focus();
            } else if (name === 'format' && form.format === '') {
                minutesRef.current.focus();
            }
        }
    };

    return (
        <SafeAreaView style={styles.mianContainer}>
            <Header
                onPress={() => {
                    handleBackPress();
                }}
                title={"Send Request"}
            />

            <View style={styles.container}>

                <CustomLayout>

                    <CustomTextInput
                        label={'Location'}
                        identifier={'location'}
                        value={form.location}
                        onValueChange={(value) => handleChange('location', value)}
                        mainContainer={{ marginTop: 10 }}
                    />
                    <Text style={styles.label}>{'Date of Service'}</Text>
                    <View style={styles.inputContainerStyle}>

                        <TextInput
                            ref={dayRef}
                            placeholder='DD'
                            placeholderTextColor={theme.dark.text}
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
                            placeholderTextColor={theme.dark.text}
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
                            placeholderTextColor={theme.dark.text}
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
                            ref={hoursRef}
                            placeholder='12'
                            placeholderTextColor={theme.dark.text}
                            maxLength={2}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                            value={form.hours}
                            onChangeText={(value) => handleChange('hours', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('hours', nativeEvent.key)}
                        />

                        <Text style={[styles.label, { top: 0 }]}>{":"}</Text>

                        <TextInput
                            ref={minutesRef}
                            placeholder='00'
                            placeholderTextColor={theme.dark.text}
                            maxLength={2}
                            keyboardType='number-pad'
                            style={styles.inputStyle}
                            value={form.minutes}
                            onChangeText={(value) => handleChange('minutes', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('minutes', nativeEvent.key)}
                        />

                        <Text style={[styles.label, { top: 0 }]}>{":"}</Text>

                        <TextInput
                            ref={formatRef}
                            placeholder='PM'
                            placeholderTextColor={theme.dark.text}
                            maxLength={2}
                            keyboardType='ascii-capable'
                            autoCapitalize='none'
                            style={styles.inputStyle}
                            value={form.format}
                            onChangeText={(value) => handleChange('format', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('format', nativeEvent.key)}
                        />

                    </View>
                </CustomLayout>
            </View>

            <Button
                loading={loading}
                onPress={() => {
                    handleSendRequest()
                }}
                customStyle={{
                    width: '80%',
                    marginBottom: scaleHeight(60)
                }}
                title={"Send Request"} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mianContainer: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    verticleLine: {
        height: '60%',
        width: 1,
        backgroundColor: '#909090',
        alignSelf: 'center'
    },
    label: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(17),
        color: theme.dark.inputLabel,
        marginHorizontal: 8,
        top: scaleHeight(20)
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
        height: scaleHeight(55),
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.dark.text,
        justifyContent: 'space-evenly'
    },

});

export default BuddySendRequest;
