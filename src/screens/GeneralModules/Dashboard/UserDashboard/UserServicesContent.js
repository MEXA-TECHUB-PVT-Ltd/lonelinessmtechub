import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, ScrollView } from 'react-native';
import RequestListItem from '../../../../components/RequestListItem';
import { useNavigation } from '@react-navigation/native';
import { scaleHeight } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import { theme } from '../../../../assets';
import ServicesListItem from '../../../../components/ServicesListItem';
import ButtonGroup from '../../../../components/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServiceRequests } from '../../../../redux/UserDashboard/getAllServiceRequestsSlice';
import FullScreenLoader from '../../../../components/FullScreenLoader';
import EmptyListComponent from '../../../../components/EmptyListComponent';


const UserServicesContent = ({ setCurrentIndex, initialIndex = 0 }) => {
    const dispatch = useDispatch();
    const { serviceRequests, loading, currentPage, totalPages } = useSelector((state) => state.getAllServiceRequests);
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const buttons = ['Upcoming', 'Requested', 'Completed'];


    const handleSelectedChange = (button, index) => {
        setSelectedIndex(index)
        setCurrentIndex(index)
        //console.log(`Selected Index: ${index}`)
    };

    const getStatusByIndex = (index) => {
        switch (index) {
            case 0:
                return 'PAID';
            case 1:
                return '';
            case 2:
                return 'COMPLETED';
            default:
                return '';
        }
    };

    const selectedStatus = getStatusByIndex(selectedIndex);

    useEffect(() => {
        dispatch(getAllServiceRequests({ page, limit: 10, status: selectedStatus }))
    }, [dispatch, page, selectedStatus])

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1); // Reset to first page
        dispatch(getAllServiceRequests({ page: 1, limit: 10, status: selectedStatus }))
            .then(() => setRefreshing(false))
            .catch(() => setRefreshing(false));
    };

    const handleLoadMore = () => {
        if (currentPage < totalPages && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderItem = ({ item }) => (
        <ServicesListItem
            item={item}
            navigation={navigation}
            index={selectedIndex}
        />
    );

    const showLoader = () => {
        return <FullScreenLoader
            title={"Please wait fetching requests..."}
            loading={loading} />
    }

    return (

        <SafeAreaView style={styles.container}>

            <View style={{
                flex: 1,
                padding: 16,
                marginBottom: scaleHeight(70)
            }}>
                <ButtonGroup
                    onSelectedChange={handleSelectedChange}
                    buttons={buttons}
                    selectedIndex={selectedIndex}
                />
                {
                    loading && !refreshing ? showLoader() : serviceRequests?.length > 0 ? <View>

                        <FlatList
                            data={serviceRequests}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => item + index}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={[theme.dark.primary]}
                                    progressBackgroundColor={theme.dark.secondary}
                                />
                            }
                        />

                    </View> :
                        (
                            <ScrollView
                                contentContainerStyle={{ flex: 1 }}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        colors={[theme.dark.primary]}
                                        progressBackgroundColor={theme.dark.secondary}
                                    />
                                }
                            >
                                <EmptyListComponent title={"No requests yet."} />
                            </ScrollView>
                        )
                }
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
