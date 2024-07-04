import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../assets';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header';
import { resetNavigation } from '../../utils/resetNavigation';
import { SCREENS } from '../../constant/constants';
import useBackHandler from '../../utils/useBackHandler';
import fonts from '../../styles/fonts';
import { scaleHeight } from '../../styles/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { createConnectedAccount } from '../../redux/PaymentSlices/createConnectedAccountSlice';
import { useAlert } from '../../providers/AlertContext';
import { accountOnboarding } from '../../redux/PaymentSlices/accountOnboardingSlice';
import FullScreenLoader from '../../components/FullScreenLoader';

const StripeAccountCreation = ({ navigation }) => {
    const dispatch = useDispatch();
    const { showAlert } = useAlert();
    const webviewRef = useRef(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [webUrl, setWebUrl] = useState(false);

    const handleBackPress = () => {
        if (canGoBack) {
            webviewRef.current.goBack();
        } else {
            resetNavigation(navigation, SCREENS.ONBOARDING);
        }
        return true;
    };

    useBackHandler(handleBackPress);

    // useEffect(() => {
    //     const createAccountUrl = async () => {
    //         try {
    //             const createResult = await dispatch(createConnectedAccount());
    //             if (createResult?.payload?.status === "success") {
    //                 showAlert("Success", "success", createResult?.payload?.message);

    //                 const onboardResult = await dispatch(accountOnboarding());
    //                 if (onboardResult?.payload?.status === "success") {
    //                     setWebUrl(onboardResult?.payload?.result?.url);
    //                 } else {
    //                     showAlert("Error", "error", onboardResult?.payload?.message);
    //                 }
    //             } else {
    //                 showAlert("Error", "error", createResult?.payload?.message);
    //             }
    //         } catch (error) {
    //             showAlert("Error", "error", "An unexpected error occurred");
    //         }
    //     };

    //     createAccountUrl();

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch]);

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
            {/* {
                true ? <FullScreenLoader loading={true} /> : <WebView
                    ref={webviewRef}
                    source={{ uri: 'https://connect.stripe.com/setup/s/acct_1POa2eQapF7UYlPO/8DrtMDRufxhl' }}
                    style={{ flex: 1 }}
                    onNavigationStateChange={(navState) => {
                        setCanGoBack(navState.canGoBack);
                    }}
                />
            } */}

            <WebView
                ref={webviewRef}
                source={{ uri: 'https://connect.stripe.com/setup/s/acct_1POa2eQapF7UYlPO/8DrtMDRufxhl' }}
                style={{ flex: 1 }}
                onNavigationStateChange={(navState) => {
                    setCanGoBack(navState.canGoBack);
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },
});

export default StripeAccountCreation;
