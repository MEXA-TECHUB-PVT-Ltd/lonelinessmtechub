import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../assets';
import { scaleHeight } from '../styles/responsive';
import fonts from '../styles/fonts';

const LanguagesItem = ({ languages }) => {
    return (
        <View style={styles.container}>
            {languages.map((language, index) => (
                <View key={index} style={styles.languageContainer}>
                    <Text style={styles.languageText}>{language}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    languageContainer: {
        backgroundColor: theme.dark.inputBg,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.dark.heading,
        paddingVertical: 5,
        paddingHorizontal: 15,
        margin: 5,
        flexBasis: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageText: {
        color: theme.dark.heading,
        fontSize: scaleHeight(15),
        fontFamily: fonts.fontsType.medium
    },
});

export default LanguagesItem;
