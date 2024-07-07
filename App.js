import React from 'react';
import { View, StyleSheet, StatusBar, LogBox } from 'react-native';
import { AlertProvider } from './src/providers/AlertContext';
import DynamicAlert from './src/components/DynamicAlert';
import { theme } from './src/assets';
import Root from './src/navigations/Root';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <View style={styles.container}>
            <StatusBar backgroundColor={theme.dark.background} />
            <Root />
            <DynamicAlert />
          </View>
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
