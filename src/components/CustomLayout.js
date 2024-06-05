import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { theme } from '../assets';

const CustomLayout = ({ children }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: theme.dark.background, }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={{ backgroundColor: theme.dark.background }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                    {children}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default CustomLayout;
