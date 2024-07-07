import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput } from 'react-native';
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
import { birthdayImg } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { setDataPayload } from '../../../redux/appSlice';

const BuddyBirthDate = ({ navigation }) => {
    const dispatch = useDispatch();
    const { dataPayload } = useSelector((state) => state.app);
    const [form, setForm] = useState({ day: '', month: '', year: '' });
    const [errors, setErrors] = useState({ birthDate: '' });

    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const handleChange = (name, value) => {

        if (name === 'day' && parseInt(value) > 31) {
            value = '31'; // Reset to max valid value if greater than 31
        }
        if (name === 'month' && parseInt(value) > 12) {
            value = '12'; // Reset to max valid value if greater than 12
        }

        setForm({ ...form, [name]: value });

        if (name === 'day' && value.length === 2) {
            monthRef.current.focus();
        } else if (name === 'month' && value.length === 2) {
            yearRef.current.focus();
        }

        let error = '';
        if (name === 'birthDate') {
            if (value === '') {
                error = 'Birthdate is required.';
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.BUDDY_ABOUT)
        return true;
    };
    useBackHandler(handleBackPress);

    useEffect(() => {
        if (dataPayload?.birthDate) {
            const [year, month, day] = dataPayload?.birthDate.split("-");
            setForm({
                day: day, month: month, year: year
            })
        }

    }, [dataPayload]);

    const handlebirthDate = () => {
        const { day, month, year } = form;
        let valid = true;
        let newErrors = { birthDate: '' };

        if (day === '' || month === '' || year === '') {
            newErrors.birthDate = 'Birthdate is required.';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            const birthDate = `${year}-${month}-${day}`;
            const newPayload = { ...dataPayload, birthDate };
            dispatch(setDataPayload(newPayload));
            resetNavigation(navigation, SCREENS.BUDDY_GENDER_SELECTION)
        }
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
            <ProfileProgressBar progress={50} onPress={() => {
                resetNavigation(navigation, SCREENS.BUDDY_ABOUT)
            }} />
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Let’s Celebrate You!
                    </Text>
                    <Text style={styles.subTitle}>
                        Tell us your birthday. Your profile doesn’t display your birthday, only your age.
                    </Text>
                    <Image style={styles.imageStyle} source={birthdayImg} />

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
                    {errors.birthDate ? <Text style={styles.errorText}>{errors.birthDate}</Text> : null}
                </View>



            </CustomLayout>

            <View style={styles.buttonContainer}>

                <HorizontalDivider
                    customStyle={{
                        marginTop: 40
                    }} />

                <Button
                    onPress={() => {
                        handlebirthDate();
                    }}
                    title={'Continue'}
                />
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
        flex: 1
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
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        // marginTop: scaleHeight(200),
        // marginBottom: scaleHeight(20)
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
        height: scaleHeight(55),
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.dark.text,
        justifyContent: 'space-evenly'
    },
    imageStyle: {
        width: scaleWidth(90),
        height: scaleHeight(100),
        marginTop: scaleHeight(30),
        alignSelf: 'center'
    },
    errorText: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(12),
        color: theme.dark.error,
        marginTop: 8,
        marginHorizontal: scaleWidth(15),
    },
});


export default BuddyBirthDate;
