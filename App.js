import React from 'react';
import { View, StyleSheet, StatusBar, LogBox } from 'react-native';
import { AlertProvider } from './src/providers/AlertContext';
import DynamicAlert from './src/components/DynamicAlert';
import { theme } from './src/assets';
import Root from './src/navigations/Root';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  const stripeKey = "pk_test_51OmriNHtA3SK3biQ6qq8s1IrRmnZ08NsSlklyXD9GN8gLPGsR4tGqH08FkxkBDvPrEMIPLEIQMkAc8NrASOByh6E00ayjZlEWe"
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <StripeProvider publishableKey={stripeKey}>
            <View style={styles.container}>
              <StatusBar backgroundColor={theme.dark.background} />
              <Root />
              <DynamicAlert />
            </View>
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
