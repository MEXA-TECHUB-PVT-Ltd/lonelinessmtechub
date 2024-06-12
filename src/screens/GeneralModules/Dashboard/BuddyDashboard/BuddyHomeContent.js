import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../../../../assets';

const BuddyHomeContent = () => {
    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary
    },
});

//make this component available to the app
export default BuddyHomeContent;
