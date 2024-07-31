import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
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
import CustomTextInput from '../../../../components/TextInputComponent';
import { useAlert } from '../../../../providers/AlertContext';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../../redux/getAllCategoriesSlice';
import { sendRequest } from '../../../../redux/UserDashboard/sendRequestSlice';
import { setWarningContent } from '../../../../redux/warningModalSlice';
import { Dropdown } from 'react-native-element-dropdown';
import * as Animatable from 'react-native-animatable';
import { useStripe, CardField } from '@stripe/stripe-react-native';
import { attachPaymentMethod } from '../../../../redux/PaymentSlices/attachPaymentMethodSlice';
import { createCustomer } from '../../../../redux/PaymentSlices/createCustomerSlice';
import { getTransactionHistory } from '../../../../redux/PaymentSlices/getTransactionHistorySlice';
import AntDesign from 'react-native-vector-icons/AntDesign'

const data = [
    { label: 'Card', value: 'CARD', description: 'The full amount will be charged to your card.' },
    { label: 'Wallet', value: 'WALLET', description: 'The total payment will be deducted from your wallet balance.' },
];

const SendRequest = ({ navigation }) => {
    const dispatch = useDispatch();
    const { createPaymentMethod } = useStripe();
    const { loading } = useSelector((state) => state.sendRequest)
    const { categories } = useSelector((state) => state.getCategories)
    const { walletAmount } = useSelector((state) => state.getTransactionHistory);
    const { currentRoute } = useSelector((state) => state.app)
    const { userLoginInfo } = useSelector((state) => state.auth)
    const { showAlert } = useAlert();
    const [category, setCategory] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [description, setDescription] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [paymentLoader, setPaymentLoader] = useState(false);
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [isOverlayOpened, setOverlayOpened] = useState(false);
    const [cardDetails, setCradDetails] = useState({});
    const { customer_id } = userLoginInfo?.user
    const [form, setForm] = useState({
        day: '',
        month: '',
        year: '',
        hours: '',
        minutes: '',
        period: '',
        location: '',
        number_of_hours: ''
    });
    const [errors, setErrors] = useState({
        day: '',
        month: '',
        year: '',
        hours: '',
        minutes: '',
        period: '',
        location: '',
        number_of_hours: ''
    });

    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const hoursRef = useRef(null);
    const minutesRef = useRef(null);
    const periodRef = useRef(null);

    const handleBackPress = () => {
        resetNavigation(navigation, currentRoute?.route, { screen: SCREENS.HOME })
        return true;
    };
    useBackHandler(handleBackPress);


    useEffect(() => {
        dispatch(setWarningContent(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const handleCategoryPress = (item) => {
        setCategory(item?.id)
        //console.log('Category pressed:', item);
    };

    const handleChange = (name, value) => {

        let error = '';
        if (name === 'day' && parseInt(value) > 31) {
            value = '31'; // Reset to max valid value if greater than 31
        }
        if (name === 'month' && parseInt(value) > 12) {
            value = '12'; // Reset to max valid value if greater than 12
        }
        setForm({ ...form, [name]: value });
        if (name === 'day' || name === 'month' || name === 'year') {
            if (value === '') {
                error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
            }
        } else if (name === 'hours' || name === 'minutes' || name === 'period') {
            if (value === '') {
                error = `${name.charAt(0).toUpperCase() + name.slice(1)} field is required`;
            }
        } else if (name === 'location') {
            if (value === '') {
                error = 'Location field is required.';
            }
        }
        else if (name === 'number_of_hours') {
            if (value === '') {
                error = 'No. of hours is required.';
            }
        }
        setErrors({ ...errors, [name]: error });


        if (name === 'day' && value.length === 2) {
            monthRef.current.focus();
        } else if (name === 'month' && value.length === 2) {
            yearRef.current.focus();
        }


        if (name === 'hours' && value.length === 2) {
            minutesRef.current.focus();
        } else if (name === 'minutes' && value.length === 2) {
            periodRef.current.focus();
        }


    };

    const handleKeyPress = (name, key) => {
        if (key === 'Backspace') {
            if (name === 'month' && form.month === '') {
                dayRef.current.focus();
            } else if (name === 'year' && form.year === '') {
                monthRef.current.focus();
            } else if (name === 'hours' && form.hours === '') {
                yearRef.current.focus();
            } else if (name === 'minutes' && form.minutes === '') {
                hoursRef.current.focus();
            } else if (name === 'period' && form.period === '') {
                minutesRef.current.focus();
            }
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardStatus(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardStatus(false);
            }
        );

        // Cleanup listeners on unmount
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleAttachPaymentMethod = (paymentMethodId) => {
        setPaymentLoader(true)
        const payload = {
            payment_method_id: paymentMethodId
        }
        dispatch(attachPaymentMethod(payload)).then((result) => {
            setPaymentLoader(false)
            console.log("attachPayment--->", result?.payload)
            if (result?.payload?.status === "success") {
                handleSendRequest(paymentMethodId)
            } else {
                setPaymentLoader(false)
                showAlert("Error", "error", result?.payload?.message)
            }
        })
    }

    const handleCreateCustomer = (paymentMethodId) => {
        setPaymentLoader(true)
        dispatch(createCustomer()).then((result) => {
            if (result?.payload?.status === "success") {
                handleAttachPaymentMethod(paymentMethodId)
            } else {
                setPaymentLoader(false)
                showAlert("Error", "error", result?.payload?.message)
            }
        })
    }

    const handleCreatePaymentMethod = async () => {
        setPaymentLoader(true)
        console.log('cardDetails', cardDetails)
        try {
            const { paymentMethod, error } = await createPaymentMethod({
                type: 'card',
                card: cardDetails.card,
                paymentMethodType: 'Card',
            },);

            if (error) {
                setPaymentLoader(false)
                showAlert("Error", "error", error?.message)
                console.error('Error creating payment method:', error);
            } else {
                console.log('Created payment method:', paymentMethod?.id);
                //call create customer api here..
                if (customer_id === null) {
                    console.log("customer not created")
                    handleCreateCustomer(paymentMethod?.id)
                } else {
                    console.log("customer already created")
                    handleAttachPaymentMethod(paymentMethod?.id)
                }
            }
        } catch (error) {
            setPaymentLoader(false)
            console.error('Error creating payment method:', error);
        }
    }

    const handleSendRequest = (payment_method_id = 'default_payment_id') => {
        let isValid = true;
        const newErrors = {};
        ['day', 'month', 'year'].forEach(field => {
            if (form[field] === '') {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                isValid = false;
            }
        });

        // Validate hours, minutes, period, and location fields
        ['hours', 'minutes', 'period', 'location'].forEach(field => {
            if (form[field] === '') {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} field is required`;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (isValid) {

            const { day, month, year, hours, minutes, period, location, number_of_hours } = form
            const booking_time = `${hours}:${minutes}:00 ${period}`
            const booking_date = `${year}-${month}-${day}`
            let booking_price = parseInt(number_of_hours * currentRoute?.hourly_rate)
            const method = (selectedValue === "WALLET" && walletAmount < booking_price) ? "WALLET_CARD" : selectedValue;

            const payload = {
                buddy_id: currentRoute?.buddy_id,
                category_id: category,
                booking_date: booking_date,
                booking_time: booking_time,
                hours: number_of_hours,
                location: location,
                booking_price: booking_price,
                payment_method_id: payment_method_id,
                method: method
                // ...((selectedValue === "CARD" || selectedValue === "WALLET_CARD") && { payment_method_id: payment_method_id }),
                // ...((selectedValue === "CARD" || selectedValue === "WALLET_CARD") && { method: selectedValue }),
            }

            console.log(payload)

            dispatch(sendRequest(payload)).then((result) => {
                if (result?.payload?.status === "success") {
                    showAlert("Success", "success", result?.payload?.message);
                    setTimeout(() => {
                        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
                    }, 3000);

                } else if (result?.payload?.status === "error") {
                    showAlert("Error", "error", result?.payload?.message);
                }
            })



        } else {
            showAlert("Error", "error", "Please fill in all required fields.");
        }
    };

    const handleButtonClick = () => {
        const booking_price = parseInt(form?.number_of_hours * currentRoute?.hourly_rate);
        const isWalletInsufficient = selectedValue === "WALLET" && walletAmount < booking_price;

        if (selectedValue === "CARD" || isWalletInsufficient) {
            setOverlayOpened(true);
            if (isWalletInsufficient) {
                setDescription(`Your wallet balance is ${walletAmount}, the remaining amount would be deducted from the card.`);
            }
        } else {
            handleSendRequest();
        }
    };

    const fetchWalletAmount = () => {
        dispatch(getTransactionHistory({ page: 1, limit: 1, is_refunded: false }));
    }

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === selectedValue && (
                    <Icon
                        color={theme.dark.secondary}
                        name="check-circle"
                        size={20}
                    />
                )}

            </View>
        );
    };


    const Overlay = () => {
        return (
            <View style={styles.overlay}>

                <Animatable.View
                    animation="bounceIn"
                    duration={2000}
                    style={[styles.overlayConatiner, { height: keyboardStatus ? '40%' : '25%' }]}>

                    <AntDesign
                        onPress={() => {
                            setOverlayOpened(false)
                        }}
                        style={styles.overlayIcon}
                        size={26}
                        name='closecircle'
                        color={theme.dark.secondary} />

                    <Text style={styles.cardHeading}>
                        Enter Card Detail
                    </Text>

                    <CardField
                        postalCodeEnabled={false}
                        // autofocus={true}
                        placeholder={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                        }}
                        style={{
                            width: '80%',
                            height: '20%',
                        }}
                        onCardChange={(cardDetails) => {
                            setCradDetails({ type: 'card', card: cardDetails });
                        }}
                    />

                    <Button
                        loading={paymentLoader}
                        isBgTransparent={true}
                        onPress={() => {
                            handleCreatePaymentMethod();
                        }}
                        title={"Pay"}
                        customStyle={styles.customButton}
                        textCustomStyle={{
                            color: theme.dark.secondary
                        }}
                    />

                </Animatable.View>
            </View >
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    handleBackPress();
                }}
                style={styles.backButton}>
                <Icon name={'arrow-back'} size={28} color={theme.dark.secondary} />
            </TouchableOpacity>
            <CustomLayout>
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
                    <CategoryList
                        categories={currentRoute?.categories}
                        onPress={handleCategoryPress} />

                    <Text style={styles.label}>{"Date of Services"}</Text>
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
                            placeholder='00'
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
                            ref={periodRef}
                            placeholder='PM'
                            autoCapitalize='characters'
                            placeholderTextColor={theme.dark.text}
                            maxLength={2}
                            style={styles.inputStyle}
                            value={form.period}
                            onChangeText={(value) => handleChange('period', value)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress('period', nativeEvent.key)}
                        />
                    </View>

                    <CustomTextInput
                        label={'No. of Hours'}
                        identifier={'number_of_hours'}
                        inputType='number-pad'
                        value={form.number_of_hours}
                        onValueChange={(value) => handleChange('number_of_hours', value)}
                        mainContainer={{ marginTop: 10 }}
                    />

                    <CustomTextInput
                        label={'Location'}
                        identifier={'location'}
                        value={form.location}
                        onValueChange={(value) => handleChange('location', value)}
                        mainContainer={{ marginTop: 10 }}
                    />

                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={250}
                        dropdownPosition='top'
                        containerStyle={{
                            backgroundColor: theme.dark.primary,
                            borderColor: theme.dark.inputLabel
                        }}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select Payment Method'}
                        value={selectedValue}
                        onChange={item => {
                            setSelectedValue(item?.value);
                            setDescription(item?.description)
                            if (item?.value === "WALLET") {
                                fetchWalletAmount()
                            }
                        }}
                        renderItem={renderItem}
                    />

                    <Text style={{
                        fontFamily: fonts.fontsType.regular,
                        fontSize: scaleHeight(14),
                        color: theme.dark.success,
                        marginTop: 10,
                        marginHorizontal: 10
                    }}>{description}</Text>


                </View>


            </CustomLayout>
            <View style={styles.buttonContainer}>
                <HorizontalDivider customStyle={{ marginTop: 10 }} />
                <Button
                    loading={loading}
                    onPress={handleButtonClick}
                    title={'Send Request'}
                    customStyle={{ marginBottom: scaleHeight(20) }}
                />
            </View>
            {isOverlayOpened && Overlay()}
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
        // marginTop: scaleHeight(-20)
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
    },

    dropdown: {
        backgroundColor: theme.dark.inputBg,
        marginTop: scaleHeight(30),
        height: scaleHeight(50),
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.dark.text,
        paddingHorizontal: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    placeholderStyle: {
        fontSize: scaleHeight(16),
        color: theme.dark.text,
        marginHorizontal: 10
    },
    selectedTextStyle: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(18),
        color: theme.dark.inputLabel,
        marginHorizontal: 10
    },

    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.dark.primary,

    },
    textItem: {
        flex: 1,
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(16),
        color: theme.dark.white
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeading: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: 16,
        color: theme.dark.primary,
        alignSelf: 'center',
        marginBottom: 20
    },
    overlayConatiner: {
        backgroundColor: 'white',
        width: '80%',
        height: '25%',
        borderRadius: 16,
        margin: 30
    },
    overlayIcon: {
        alignSelf: 'flex-end',
        left: 4,
        bottom: 4
    },
    customButton: {
        backgroundColor: theme.dark.primary,
        width: '80%',
        marginBottom: 0,
        marginTop: 40
    }
});

export default SendRequest;
