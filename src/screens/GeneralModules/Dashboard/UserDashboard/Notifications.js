//import liraries
import React from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { theme } from '../../../../assets';
import { notiImg } from '../../../../assets/images';
import NotificationItem from '../../../../components/NotificationItem';
import Header from '../../../../components/Header';
import { resetNavigation } from '../../../../utils/resetNavigation';
import { SCREENS } from '../../../../constant/constants';
import useBackHandler from '../../../../utils/useBackHandler';

// Sample data for notifications
const notifications = [
    {
        id: 1,
        image: notiImg,
        title: 'Notification Title 1',
        description: 'Notification Description 1',
        time: '10:00 AM',
    },
    {
        id: 2,
        image: notiImg,
        title: 'Notification Title 2',
        description: 'Notification Description 2',
        time: '11:30 AM',
    },
    // Add more sample data as needed
];

// create a component
const Notification = ({ navigation }) => {


    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
        return true;
    };
    useBackHandler(handleBackPress);

    return (
        <SafeAreaView style={styles.container}>
            <Header
                onPress={() => {
                    resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
                }}
                icon={"settings"}
                title={"Notifications"} 
                iconPress={()=>{
                    resetNavigation(navigation, SCREENS.NOTIFICATION_SETTING)
                }}
                />
            <View style={{
                padding: 25
            }}>

                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <NotificationItem
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            time={item.time}
                        />
                    )}
                />

            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.background,
    },
});

//make this component available to the app
export default Notification;
