import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { scaleHeight } from '../styles/responsive';
import { theme } from '../assets';
import fonts from '../styles/fonts';

const CategoryList = ({ categories, onPress }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handlePress = (item) => {
        setSelectedCategory(item.id);
        onPress(item);
    };

    const renderItem = ({ item }) => {
        const isSelected = item.id === selectedCategory;
        return (
            <TouchableOpacity
                style={[styles.container, isSelected && styles.selectedContainer]}
                onPress={() => handlePress(item)}
            >
                <Image source={item.image} style={styles.image} />
                <Text style={styles.text}>{item.text}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.dark.inputBg,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.dark.inputLabel,
        padding: 10,
        margin: 5,
        //flex: 0.5,
    },
    selectedContainer: {
        borderColor: theme.dark.secondary,
    },
    image: {
        width: 15,
        height: 15,
        marginRight: 10,
    },
    text: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(15),
        color: theme.dark.inputLabel,
    },
    list: {
        justifyContent: 'center',
    },
});

export default CategoryList;
