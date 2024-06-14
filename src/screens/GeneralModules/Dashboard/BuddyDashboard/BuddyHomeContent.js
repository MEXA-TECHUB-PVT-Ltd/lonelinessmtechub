import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { theme } from '../../../../assets';
import RequestListItem from '../../../../components/RequestListItem';
import { useNavigation } from '@react-navigation/native';
import { scaleHeight } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';

const BuddyHomeContent = () => {

    const navigation = useNavigation();

    const data = [
        { id: '1', name: 'Olivia Williams', age: 24, status: 'Pending', category: 'Lunch', dateTime: '24/05/2024/03:00pm' },
        { id: '2', name: 'John Doe', age: 30, status: 'Requested', category: 'Dinner', dateTime: '25/05/2024/07:00pm' },
        { id: '3', name: 'Jane Smith', age: 22, status: 'Rejected', category: 'Breakfast', dateTime: '26/05/2024/08:00am' },
        { id: '4', name: 'Henery', age: 22, status: 'Rejected', category: 'Breakfast', dateTime: '26/05/2024/08:00am' },
        { id: '5', name: 'Harry', age: 22, status: 'Rejected', category: 'Breakfast', dateTime: '26/05/2024/08:00am' },
        { id: '6', name: 'Anorald', age: 22, status: 'Rejected', category: 'Breakfast', dateTime: '26/05/2024/08:00am' },
        { id: '7', name: 'Swift', age: 22, status: 'Accepted', category: 'Breakfast', dateTime: '26/05/2024/08:00am' },
        { id: '8', name: 'Taylor', age: 22, status: 'Accepted', category: 'Breakfast', dateTime: '26/05/2024/08:00am' },
    ];

    const renderItem = ({ item }) => (
        <RequestListItem
            item={item}
            navigation={navigation} />
    );



    return (
        <SafeAreaView style={styles.container}>

            <View style={{
                padding: 16
            }}>
                <Text style={{
                    fontFamily: fonts.fontsType.semiBold,
                    fontSize: scaleHeight(18),
                    color: theme.dark.white,
                    marginHorizontal: 16
                }}>Service Requests</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary
    },
});

export default BuddyHomeContent;
