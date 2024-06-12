import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { scaleHeight, scaleWidth } from '../styles/responsive';
import fonts from '../styles/fonts';
import { theme } from '../assets';

const CheckBox = ({ label, labelStyle, checkBoxStyle }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
        setChecked(!checked);
    };

    return (
        <TouchableOpacity
            style={styles.mainContainer}
            onPress={handleToggle}>
            <View style={[styles.checkbox, checked && styles.checked, checkBoxStyle]}>
                {checked && <Icon style={{ alignSelf: 'center' }} name="check" size={15} color={theme.dark.black} />}
            </View>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    label: {

        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(14),
        color: theme.dark.white,
        alignSelf: 'center'
    },
    checkbox: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.dark.text,
        marginRight: 10,
        backgroundColor: theme.dark.inputBackground
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    checked: {
        backgroundColor: theme.dark.secondary,
        borderColor: theme.dark.secondary,
    },
});

export default CheckBox;
