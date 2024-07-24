import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { theme } from '../../assets';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header';
import { resetNavigation } from '../../utils/resetNavigation';
import { SCREENS } from '../../constant/constants';
import useBackHandler from '../../utils/useBackHandler';
import fonts from '../../styles/fonts';
import { scaleHeight, scaleWidth } from '../../styles/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { createConnectedAccount } from '../../redux/PaymentSlices/createConnectedAccountSlice';
import { useAlert } from '../../providers/AlertContext';
import { accountOnboarding } from '../../redux/PaymentSlices/accountOnboardingSlice';
import FullScreenLoader from '../../components/FullScreenLoader';
import queryString from 'query-string';
import { checkStripeRequirements } from '../../redux/PaymentSlices/checkStripeRequirementsSlice';
import { setAsRemember } from '../../redux/rememberMeSlice';
import { login } from '../../redux/AuthModule/signInSlice';
import { alertLogo, successText } from '../../assets/images';
import Spinner from '../../components/Spinner';
import Modal from "react-native-modal";

const StripeAccountCreation = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.connectedAccount)
    const onboardingLoader = useSelector((state) => state.accountOnboarding.loading)
    const { credentials } = useSelector((state) => state.tempCredentials);
    const { showAlert } = useAlert();
    const webviewRef = useRef(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [webUrl, setWebUrl] = useState('');
    const timeoutRef = useRef(null);

    const handleBackPress = () => {
        if (canGoBack) {
            webviewRef.current.goBack();
        } else {
            resetNavigation(navigation, SCREENS.ONBOARDING);
        }
        return true;
    };

    useBackHandler(handleBackPress);

    useEffect(() => {
        const createAccountUrl = async () => {
            try {
                const createResult = await dispatch(createConnectedAccount());
                if (createResult?.payload?.status === "success") {
                    showAlert("Success", "success", createResult?.payload?.message);

                    const onboardResult = await dispatch(accountOnboarding());
                    if (onboardResult?.payload?.status === "success") {
                        setWebUrl(onboardResult?.payload?.result?.url);
                    } else {
                        showAlert("Error", "error", onboardResult?.payload?.message);
                    }
                } else {
                    showAlert("Error", "error", createResult?.payload?.message);
                }
            } catch (error) {
                showAlert("Error", "error", "An unexpected error occurred");
            }
        };

        createAccountUrl();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    const parseResponseData = (url) => {
        const urlParts = url.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        const secondLastPart = urlParts[urlParts.length - 2];
        let accountId = null;
        let uniqueIdentifier = null;
        let query = {};

        if (lastPart.includes('?')) {
            const parsed = queryString.parseUrl(url);
            query = parsed.query;
        } else {
            accountId = secondLastPart;
            uniqueIdentifier = lastPart;
        }

        return { accountId, uniqueIdentifier, query };
    };

    const checkRequirements = () => {
        dispatch(checkStripeRequirements()).then((result) => {
            if (result?.payload?.status === "success") {
                showHideModal();
            }
            else if (result?.payload?.status === "error") {
                showAlert("Error", "error", result?.payload?.message)
            }
        })
    }


    const handleNavigationStateChange = (newNavState) => {
        setCanGoBack(newNavState.canGoBack);
        const { url } = newNavState;
        let responseData = {};

        if (url.startsWith('https://connect.stripe.com/setup/s')) {
            //responseData = parseResponseData(url);
            checkRequirements();
        }
    };

    const showHideModal = () => {
        dispatch(setAsRemember(null))
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
            dispatch(login({ email: credentials?.email, password: credentials?.password, device_token: 'testing-token-remove-later' }));
        }, 3000);
    };

    const renderWebView = () => {
        if (!webUrl && (loading || onboardingLoader)) {
            return <FullScreenLoader
                loading={(loading || onboardingLoader)} />;
        }

        return (
            <WebView
                ref={webviewRef}
                source={{ uri: webUrl }}
                style={{ flex: 1 }}
                onNavigationStateChange={handleNavigationStateChange}
            // onNavigationStateChange={(navState) => {
            //     setCanGoBack(navState.canGoBack);
            // }}
            />
        );
    };

    const showModalView = () => {

        return <Modal
            backdropOpacity={0.90}
            backdropColor={'rgba(85, 85, 85, 0.70)'}
            isVisible={modalVisible}
            animationIn={'bounceIn'}
            animationOut={'bounceOut'}
            animationInTiming={1000}
            animationOutTiming={1000}
        >
            <View style={{
                backgroundColor: '#111111',
                width: '90%',
                height: '50%',
                alignSelf: 'center',
                borderRadius: 20,
                elevation: 20,
                padding: 20
            }}>

                <Image
                    resizeMode='contain'
                    source={alertLogo}
                    style={{
                        width: scaleWidth(120),
                        height: scaleHeight(120),
                        alignSelf: 'center'
                    }}
                />

                <Image
                    resizeMode='contain'
                    source={successText}
                    style={{
                        width: scaleHeight(130),
                        height: scaleHeight(45),
                        alignSelf: 'center',
                        marginTop: 10
                    }}
                />
                <Text style={styles.subTitle}>
                    {`Please wait...${'\n'}You will be directed to the homepage`}
                </Text>
                <Spinner />
            </View>
        </Modal>
    }

    return (
        <View style={styles.container}>
            <Header
                title={"Stripe Account Creation"}
                customTextStyle={{
                    color: theme.dark.secondary,
                    fontSize: scaleHeight(14),
                    fontFamily: fonts.fontsType.medium,
                    marginHorizontal: 20,
                }}
                onPress={handleBackPress}
            />
            {renderWebView()}
            {showModalView()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },
    subTitle: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(14),
        color: theme.dark.heading,
        marginTop: 5,
        alignSelf: 'center',
        textAlign: 'center',
        width: scaleWidth(300)
    },
});

export default StripeAccountCreation;
