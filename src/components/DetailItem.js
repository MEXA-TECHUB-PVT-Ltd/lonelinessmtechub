import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleHeight } from '../styles/responsive';
import fonts from '../styles/fonts';
import { theme } from '../assets';

const DetailItem = ({ label, value }) => (
    <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    detailLabel: {
        fontSize: scaleHeight(16),
        fontWeight: fonts.fontsType.medium,
        color: theme.dark.white
    },
    detailValue: {
        fontSize: scaleHeight(15),
        fontWeight: fonts.fontsType.regular,
        color: theme.dark.inputLabel
    },
});

export default DetailItem;
