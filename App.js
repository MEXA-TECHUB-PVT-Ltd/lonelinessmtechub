import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { AlertProvider } from './src/providers/AlertContext';
import DynamicAlert from './src/components/DynamicAlert';
import { useAlert } from './src/providers/AlertContext';
import { theme } from './src/assets';
import Root from './src/navigations/Root';
import { AuthProvider } from './src/providers/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
    <AlertProvider>
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.dark.background} />
        <Root />
        <DynamicAlert />
      </View>
    </AlertProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark.background
  },
});

export default App;
