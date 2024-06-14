import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import RequestListItem from '../../../../components/RequestListItem';
import { useNavigation } from '@react-navigation/native';
import { scaleHeight } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import { theme } from '../../../../assets';
import ServicesListItem from '../../../../components/ServicesListItem';
import ButtonGroup from '../../../../components/ButtonGroup';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const UserServicesContent = ({ setCurrentIndex }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigation = useNavigation();
    const buttons = ['Upcoming', 'Requested', 'Completed'];
    const handleSelectedChange = (button, index) => {
        setSelectedIndex(index)
        setCurrentIndex(index)
        console.log(`Selected Index: ${index}`)
    };

    const data = [
        { id: '1', name: 'Olivia Williams', age: 24, status: 'Pending', category: 'Lunch', dateTime: '24/05/2024/03:00pm' },
        { id: '2', name: 'John Doe', age: 30, status: 'Requested', category: 'Dinner', dateTime: '25/05/2024/07:00pm' },
        { id: '3', name: 'Jane Smith', age: 22, status: 'Accepted', category: 'Breakfast', dateTime: '26/05/2024/08:00am' },
        { id: '4', name: 'Charles', age: 22, status: 'Accepted', category: 'Movie Night', dateTime: '26/05/2024/08:00am' },
        { id: '5', name: 'Swift', age: 22, status: 'Accepted', category: 'Movie Night', dateTime: '26/05/2024/08:00am' },
    ];

    const renderItem = ({ item }) => (
        <ServicesListItem
            item={item}
            navigation={navigation}
            index={selectedIndex}
        />
    );



    return (

        <SafeAreaView style={styles.container}>

            <View style={{
                padding: 16,
                marginBottom:scaleHeight(70)
            }}>
                <ButtonGroup
                    onSelectedChange={handleSelectedChange}
                    buttons={buttons}
                />
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

export default UserServicesContent;
