import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { theme } from '../../../../assets';
import RequestListItem from '../../../../components/RequestListItem';
import { useNavigation } from '@react-navigation/native';
import { scaleHeight } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import BuddyServiceListItem from '../../../../components/BuddyServiceListItem';
import ButtonGroup from '../../../../components/ButtonGroup';

const BuddyServicesContent = ({ setCurrentIndex }) => {
    const buttons = ['Upcoming', 'Completed', 'My Requests'];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigation = useNavigation();

    const data = [
        { id: '1', name: 'Olivia Williams (24)', age: 24, status: 'Pending', category: 'Lunch', dateTime: '24/05/2024/03:00pm', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: '2', name: 'John Doe (21)', age: 30, status: 'Requested', category: 'Dinner', dateTime: '25/05/2024/07:00pm', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: '3', name: 'Jane Smith (22)', age: 22, status: 'Canceled', category: 'Breakfast', dateTime: '26/05/2024/08:00am', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: '4', name: 'Charlie (19)', age: 22, status: 'Rejected', category: 'Breakfast', dateTime: '26/05/2024/08:00am', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
        { id: '5', name: 'Taylor (28)', age: 22, status: 'Accepted', category: 'Breakfast', dateTime: '26/05/2024/08:00am', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: '6', name: 'Swift (25)', age: 22, status: 'Rejected', category: 'Breakfast', dateTime: '26/05/2024/08:00am', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
    ];
    

    const renderItem = ({ item }) => (
        <BuddyServiceListItem
            item={item}
            navigation={navigation}
            index={selectedIndex} />
    );

    const handleSelectedChange = (button, index) => {
        setSelectedIndex(index)
        setCurrentIndex(index)
        console.log(`Selected Index: ${index}`)
    };


    return (
        <SafeAreaView style={styles.container}>

            <View style={{
                padding: 10,
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

export default BuddyServicesContent;
