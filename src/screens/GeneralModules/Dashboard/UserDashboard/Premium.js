import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Keyboard } from 'react-native';
import Button from '../../../../components/ButtonComponent';
import PremiumItem from '../../../../components/PremiumItem';
import { premiumGift } from '../../../../assets/images';
import { theme } from '../../../../assets';
import { scaleHeight, scaleWidth } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import { resetNavigation } from '../../../../utils/resetNavigation';
import { SCREENS } from '../../../../constant/constants';
import useBackHandler from '../../../../utils/useBackHandler';
import Header from '../../../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubscription } from '../../../../redux/getAllSubscriptionSlice';
import FullScreenLoader from '../../../../components/FullScreenLoader';
import Icon from 'react-native-vector-icons/AntDesign'
import { useStripe, CardField } from '@stripe/stripe-react-native';
import { color } from '@rneui/base';
import { createCustomer } from '../../../../redux/PaymentSlices/createCustomerSlice';
import { useAlert } from '../../../../providers/AlertContext';
import { attachPaymentMethod } from '../../../../redux/PaymentSlices/attachPaymentMethodSlice';
import { payToSubscribe } from '../../../../redux/PaymentSlices/payToSubscribeSlice';
import { updateUserLoginInfo } from '../../../../redux/AuthModule/signInSlice';
import * as Animatable from 'react-native-animatable';
import { cancelSubscription } from '../../../../redux/PaymentSlices/cancelSubscriptionSlice';

const Premium = ({ navigation }) => {
    const dispatch = useDispatch();
    const { createPaymentMethod } = useStripe();
    const { showAlert } = useAlert();
    const { subscription, loading } = useSelector((state) => state.getSubscription)
    const { loading: cancelLoader } = useSelector((state) => state.cancelSubscription)
    const { userLoginInfo } = useSelector((state) => state.auth)
    // const [selectedPlan, setSelectedPlan] = useState('1 Months');
    const [selectedPlan, setSelectedPlan] = useState('1 Months');
    const [planDetail, setPlanDetail] = useState(null);
    const [isOverlayOpened, setOverlayOpened] = useState(false);
    const [paymentLoader, setPaymentLoader] = useState(false);
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [cardDetails, setCradDetails] = useState({});
    const { currentRoute } = useSelector((state) => state.app)
    const { customer_id, is_subscribed, subscription_id, subscription_name } = userLoginInfo?.user
    const buttonTitle = is_subscribed ? "Unsubscribe" : "Pay Now!";

    const renderPlanFeatures = () => {
        const featuresByPlan = {
            '1 Months': [
                { text: "Unlock premium features for 1 month.", color: theme.dark.secondary },
                { text: "Access advanced matching capabilities.", color: theme.dark.secondary },
                { text: "Send unlimited likes to increase your connections.", color: theme.dark.inputLabel },
                { text: "Flexible monthly pricing for your convenience.", color: theme.dark.inputLabel },
                { text: "Easily upgrade, downgrade, or cancel anytime.", color: theme.dark.inputLabel }
            ],
            '6 Months': [
                { text: "Unlock premium features for 6 months.", color: theme.dark.secondary },
                { text: "Access advanced matching capabilities.", color: theme.dark.secondary },
                { text: "Send unlimited likes to increase your connections.", color: theme.dark.secondary },
                { text: "Flexible monthly pricing for your convenience.", color: theme.dark.secondary },
                { text: "Easily upgrade, downgrade, or cancel anytime.", color: theme.dark.inputLabel }
            ],
            '12 Months': [
                { text: "Unlock premium features for 12 months.", color: theme.dark.secondary },
                { text: "Access advanced matching capabilities.", color: theme.dark.secondary },
                { text: "Send unlimited likes to increase your connections.", color: theme.dark.secondary },
                { text: "Flexible monthly pricing for your convenience.", color: theme.dark.secondary },
                { text: "Easily upgrade, downgrade, or cancel anytime.", color: theme.dark.secondary }
            ],
        };

        return featuresByPlan[selectedPlan].map((feature, index) => (
            <PremiumItem
                key={index}
                iconName="checkcircle"
                iconColor={feature.color}
                text={feature.text}
            />
        ));
    };
    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: currentRoute?.isProfilePremium ? SCREENS.PROFILE : SCREENS.HOME });
        return true;
    };
    useBackHandler(handleBackPress);

    useEffect(() => {
        dispatch(getAllSubscription())
    }, [dispatch])

    useEffect(() => {
        setPlanDetail(subscription[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscription])

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


    useEffect(() => {
        if (subscription.length > 0) {
            const userSubscription = subscription.find(plan => plan.interval === subscription_name);
            if (userSubscription) {
                let planDuration = "";
                if (userSubscription.interval === "year") {
                    planDuration = "12 Months";
                } else if (userSubscription.interval === "quarter") {
                    planDuration = "6 Months";
                } else if (userSubscription.interval === "month") {
                    planDuration = "1 Months";
                }
                setSelectedPlan(planDuration);
                setPlanDetail(userSubscription);
            } else {
                setSelectedPlan("1 Months");
                setPlanDetail(subscription[0]);
            }
        }
    }, [subscription, subscription_name]);


    const handleUserUpdate = (subscriptionStatus, selectedPlan) => {
        const planMap = {
            "1 Months": "month",
            "12 Months": "year",
            "6 Months": "quarter"
        };

        const plan = planMap[selectedPlan] || 'quarter';
        const updatedInfo = {
            is_subscribed: subscriptionStatus,
            subscription_name: plan
        };
        dispatch(updateUserLoginInfo(updatedInfo));
    };

    const handleAttachPaymentMethod = (paymentMethodId) => {
        const payload = {
            // payment_method_id: paymentMethodId
            payment_method_id: "pm_card_bypassPending"
        }
        dispatch(attachPaymentMethod(payload)).then((result) => {
            if (result?.payload?.status === "success") {

                const paymentPayload = {
                    stripe_price_id: planDetail?.stripe_price_id,
                    payment_method_id: result?.payload?.result?.card_id
                }
                dispatch(payToSubscribe(paymentPayload)).then((result) => {
                    if (result?.payload?.status === "success") {
                        setPaymentLoader(false)
                        handleUserUpdate(true, selectedPlan);
                        // console.log("Payment sent--->", result?.payload)
                        showAlert("Success", "success", result?.payload?.message)
                        setTimeout(() => {
                            resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
                        }, 3000);
                    }
                    else if (result?.payload?.errors) {
                        setPaymentLoader(false)
                        showAlert("Error", "error", result?.payload?.errors)
                    }
                    else if (result?.payload?.status === "error") {
                        setPaymentLoader(false)
                        showAlert("Error", "error", result?.payload?.message)
                    }
                })
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
                showAlert("Error", "error", error?.message)
                console.error('Error creating payment method:', error);
                setPaymentLoader(false)
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
            console.error('Error creating payment method:', error);
        }
    }

    const handleCancelSubscription = () => {
        dispatch(cancelSubscription()).then((result) => {
            if (result?.payload?.status === "success") {
                showAlert("Success", "success", result?.payload?.message)

                setTimeout(() => {
                    handleUserUpdate(false, selectedPlan);
                    dispatch(getAllSubscription())
                }, 3000);
            } else {
                setPaymentLoader(false)
                showAlert("Error", "error", result?.payload?.message)
            }
        })
    }

    if (loading) {
        return <FullScreenLoader loading={loading} title={"Please wait fetching plan..."} />
    }

    const Overlay = () => {
        return (
            <View style={styles.overlay}>

                <Animatable.View
                    animation="bounceIn"
                    duration={2000}
                    style={{
                        backgroundColor: 'white',
                        width: '80%',
                        height: keyboardStatus ? '40%' : '25%',
                        borderRadius: 16,
                        margin: 30
                    }}>

                    <Icon
                        onPress={() => {
                            setOverlayOpened(false)
                        }}
                        style={{
                            alignSelf: 'flex-end',
                            left: 4,
                            bottom: 4
                        }}
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
                        customStyle={{
                            backgroundColor: theme.dark.primary,
                            width: '80%',
                            marginBottom: 0,
                            marginTop: 40
                        }}
                        textCustomStyle={{
                            color: theme.dark.secondary
                        }}
                    />

                </Animatable.View>
            </View >
        );
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                onPress={() => handleBackPress()}
                title={"Go Premium"}
            />
            <View style={styles.container}>
                <View style={styles.giftBox}>
                    <Image
                        resizeMode='contain'
                        style={{
                            width: scaleWidth(250),
                            height: scaleHeight(150),
                            alignSelf: 'center',
                        }}
                        source={premiumGift}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    {subscription?.map(plan => (
                        <TouchableOpacity
                            key={Math.round(plan.amount)}
                            style={[styles.button, selectedPlan === plan.name && styles.selectedButton]}
                            onPress={() => {
                                setSelectedPlan(plan.name)
                                setPlanDetail(plan)
                            }}
                        >
                            <Text style={[styles.buttonText, selectedPlan === plan.name && styles.selectedText]}>
                                {`${Math.floor(plan.amount)}`}
                            </Text>
                            <Text style={[styles.buttonSubText, selectedPlan === plan.name && styles.selectedSubText]}>
                                {plan.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.featuresList}>
                    {renderPlanFeatures()}
                </View>

                <Button
                    loading={is_subscribed && cancelLoader}
                    onPress={() => {
                        is_subscribed ? handleCancelSubscription() : setOverlayOpened(true);
                    }}
                    title={buttonTitle}
                />

                {/* {
                    customer_id != null ?
                        <Button
                            onPress={() => {
                                console.log(planDetail);
                            }}
                            title={"Pay Now!"}
                        /> :
                        <Button
                            onPress={() => {
                                setOverlayOpened(true);
                            }}
                            title={"Add Card"}
                        />} */}
            </View>
            {isOverlayOpened && Overlay()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },
    container: {
        padding: 25,
        alignItems: 'center',
    },
    giftBox: {
        width: 100,
        height: 100,
        marginTop: scaleHeight(30),
    },
    buttonGroup: {
        width: '100%',
        height: scaleHeight(94),
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: scaleHeight(80),
        backgroundColor: theme.dark.inputBg,
        borderRadius: 14,
    },
    button: {
        width: scaleWidth(99),
        height: scaleHeight(80),
        backgroundColor: theme.dark.transparentBg,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: theme.dark.secondary,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: theme.dark.inputLabel,
        fontSize: scaleHeight(16),
        fontFamily: fonts.fontsType.bold,
        alignSelf: 'center',
    },
    selectedText: {
        color: theme.dark.primary,
        fontSize: scaleHeight(16),
        alignSelf: 'center',
        fontFamily: fonts.fontsType.bold,
    },
    selectedSubText: {
        color: theme.dark.primary,
        fontSize: scaleHeight(14),
        alignSelf: 'center',
        fontFamily: fonts.fontsType.bold,
    },
    buttonSubText: {
        color: theme.dark.inputLabel,
        fontSize: scaleHeight(14),
        fontFamily: fonts.fontsType.regular,
        alignSelf: 'center',
    },
    featuresList: {
        marginBottom: 20,
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
    }
});

export default Premium;

