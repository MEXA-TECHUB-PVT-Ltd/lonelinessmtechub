import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { theme } from '../assets';

const CustomLayout = ({ children, customStyle }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, customStyle]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={{
                    backgroundColor: theme.dark.background
                }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'>
                    {children}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.background,
    }
});

export default CustomLayout;
