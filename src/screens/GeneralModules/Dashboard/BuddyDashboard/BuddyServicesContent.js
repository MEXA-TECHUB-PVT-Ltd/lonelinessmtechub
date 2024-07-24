import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, ScrollView } from 'react-native';
import { theme } from '../../../../assets';
import RequestListItem from '../../../../components/RequestListItem';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { scaleHeight } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import BuddyServiceListItem from '../../../../components/BuddyServiceListItem';
import ButtonGroup from '../../../../components/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBuddyServices } from '../../../../redux/BuddyDashboard/getAllBuddyServicesSlices';
import FullScreenLoader from '../../../../components/FullScreenLoader';
import EmptyListComponent from '../../../../components/EmptyListComponent';
import SkeletonLoader from '../../../../components/SkeletonLoader';

const BuddyServicesContent = ({ setCurrentIndex, initialIndex = 0, searchQuery }) => {
    const dispatch = useDispatch();
    const { serviceRequests, loading, currentPage, totalPages } = useSelector((state) => state.getAllBuddyServices);
    const { lastIndex } = useSelector((state) => state.setLastIndex);
    const [page, setPage] = useState(1);
    const buttons = ['Upcoming', 'Completed', 'My Requests'];
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const [requestData, setRequestData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()

    const handleSelectedChange = (button, index) => {
        setSelectedIndex(index)
        setCurrentIndex(index)
    };

    const getStatusByIndex = (index) => {
        switch (index) {
            case 0:
                return 'PAID';
            case 1:
                return 'COMPLETED';
            case 2:
                return '';
            default:
                return '';
        }
    };

    const selectedStatus = getStatusByIndex(selectedIndex);

    useEffect(() => {
        setRequestData([]);
        dispatch(getAllBuddyServices({ page, limit: 10, status: selectedStatus }))
    }, [dispatch, page, selectedStatus])

    // useEffect(() => {
    //     setRequestData(serviceRequests);
    // }, [serviceRequests]);

    useFocusEffect(
        React.useCallback(() => {
            setSelectedIndex(lastIndex)
        }, [lastIndex])
    );

    useEffect(() => {
        setRequestData([]);
        const filteredServiceRequests = filterServiceRequests(serviceRequests, searchQuery);
        setRequestData(filteredServiceRequests);
    }, [serviceRequests, searchQuery]);

    const filterServiceRequests = (requests, query) => {
        if (!query) return requests;
        return requests?.filter(request => request?.user?.full_name?.toLowerCase().includes(query.toLowerCase()));
    };


    const handleLoadMore = () => {
        if (currentPage < totalPages && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };


    const onRefresh = () => {
        setRequestData([]);
        setRefreshing(true);
        setPage(1); // Reset to first page
        dispatch(getAllBuddyServices({ page: 1, limit: 10, status: selectedStatus }))
            .then(() => setRefreshing(false))
            .catch(() => setRefreshing(false));
    };

    const updateRequestStatus = (updatedRequestId, newStatus) => {
        const updatedRequests = requestData?.map(request =>
            request.id === updatedRequestId ? { ...request, status: newStatus } : request
        );
        setRequestData(updatedRequests);
    };


    const renderItem = ({ item }) => (
        <BuddyServiceListItem
            item={item}
            navigation={navigation}
            index={selectedIndex}
            onRequestStatusChange={updateRequestStatus}
        />
    );


    // const showLoader = () => {
    //     return <FullScreenLoader
    //         title={"Please wait fetching requests..."}
    //         loading={loading}
    //     />
    // }

    const showLoader = () => {
        return <SkeletonLoader />
    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={{
                flex: 1,
                padding: 10,
                marginBottom: scaleHeight(70)
            }}>
                <ButtonGroup
                    onSelectedChange={handleSelectedChange}
                    buttons={buttons}
                    selectedIndex={selectedIndex}
                />
                {
                    loading && !refreshing ? showLoader() : requestData?.length > 0 ? <View>
                        <FlatList
                            data={requestData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => item + index}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={[theme.dark.primary]} // Customize loader color
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

export default BuddyServicesContent;
