import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { AlertProvider } from './src/providers/AlertContext';
import DynamicAlert from './src/components/DynamicAlert';
import { useAlert } from './src/providers/AlertContext';
import { theme } from './src/assets';
import Root from './src/navigations/Root';

const App = () => {
  return (
    <AlertProvider>
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.dark.background} />
        <Root />
        <DynamicAlert />
      </View>
    </AlertProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark.background
  },
});

export default App;
