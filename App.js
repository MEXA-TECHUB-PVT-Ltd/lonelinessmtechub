import React, { useCallback } from 'react';
import { View, StyleSheet, StatusBar, LogBox } from 'react-native';
import { AlertProvider } from './src/providers/AlertContext';
import DynamicAlert from './src/components/DynamicAlert';
import { theme } from './src/assets';
import Root from './src/navigations/Root';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import { refreshToken } from './src/redux/AuthModule/refreshTokenSlice';
import { updateUserLoginInfo } from './src/redux/AuthModule/signInSlice';
import CustomModal from './src/components/CustomModal';
import { warningImg } from './src/assets/images';
import { setWarningContent } from './src/redux/warningModalSlice';
import { scaleHeight } from './src/styles/responsive';


const MainApp = () => {
  const dispatch = useDispatch();
  const { userLoginInfo } = useSelector((state) => state.auth);
  const { warningContent } = useSelector((state) => state.warningContent);
  const { expires_at } = userLoginInfo || {};



  // useEffect(() => {
  //   const TOKEN_REFRESH_PERIOD = 1; // days

  //   const checkTokenExpiry = async () => {
  //     const currentTime = new Date().getTime();
  //     const expiresAt = parseInt(expires_at, 10);

  //     if (currentTime >= expiresAt) {
  //       console.log('Token expired..');
  //       dispatch(refreshToken()).then((result) => {
  //         const { status, message, result: refreshResult } = result?.payload;
  //         var { token, tokenExpiresIn } = refreshResult;

  //         if (status === "success") {
  //           console.log("success", message);

  //           // Update expiry date to 30 days from now
  //           const newExpiryDate = new Date();
  //           newExpiryDate.setDate(newExpiryDate.getDate() + TOKEN_REFRESH_PERIOD);

  //           const updatedRefreshToken = {
  //             token: token,
  //             tokenExpiresIn: `${tokenExpiresIn}`,
  //             expires_at: newExpiryDate.getTime()
  //           };

  //           dispatch(updateUserLoginInfo(updatedRefreshToken));
  //         }
  //       });
  //     } else {
  //       console.log('Token not expired yet..');
  //     }
  //   };

  //   checkTokenExpiry();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  const handleResetModalContent = () => {
    dispatch(setWarningContent(false))
  }

  const renderWarningModal = useCallback(() => {
    return (
      <CustomModal
        isVisible={warningContent.modalVisible}
        onClose={handleResetModalContent}
        headerTitle={"Warnings!"}
        imageSource={warningImg}
        text={warningContent.description}
        buttonText="OK"
        isParallelButton={false}
        isCross={true}
        customModalStyle={{ width: '100%' }}
        modalCustomTextStyle={{
          textAlign: 'strech',
        }}
        buttonAction={() => {
          handleResetModalContent();
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warningContent]);


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.dark.background} />
      <Root />
      <DynamicAlert />
      {renderWarningModal()}
    </View>
  );

}

const App = () => {
  const stripeKey = "pk_test_51OmriNHtA3SK3biQ6qq8s1IrRmnZ08NsSlklyXD9GN8gLPGsR4tGqH08FkxkBDvPrEMIPLEIQMkAc8NrASOByh6E00ayjZlEWe"
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <StripeProvider publishableKey={stripeKey}>
            <MainApp />
          </StripeProvider>
        </AlertProvider>
      </PersistGate>
    </Provider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark.background
  },
});

export default App;
