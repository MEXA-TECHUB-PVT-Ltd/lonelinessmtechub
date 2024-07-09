import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { theme } from '../../../../assets';
import RequestListItem from '../../../../components/RequestListItem';
import { useNavigation } from '@react-navigation/native';
import { scaleHeight } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBuddyRequest } from '../../../../redux/BuddyDashboard/getAllBuddyRequestSlice';
import EmptyListComponent from '../../../../components/EmptyListComponent';
import FullScreenLoader from '../../../../components/FullScreenLoader';

const BuddyHomeContent = () => {
    const dispatch = useDispatch();
    const { requests, loading, error, currentPage, totalPages } = useSelector((state) => state.getAllBuddyRequest);
    const [page, setPage] = useState(1);
    const navigation = useNavigation();
    const [loader, setLoader] = useState(true);
    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        dispatch(getAllBuddyRequest({ page, limit: 10 }));
        //setRequestData(requests)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page]);

    useEffect(() => {
        setRequestData(requests);
    }, [requests]);

    const handleLoadMore = () => {
        if (currentPage < totalPages && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const updateRequestStatus = (updatedRequestId, newStatus) => {
        const updatedRequests = requestData?.map(request =>
            request.id === updatedRequestId ? { ...request, status: newStatus } : request
        );
        setRequestData(updatedRequests);
    };

    const renderItem = ({ item }) => (
        <RequestListItem
            item={item}
            navigation={navigation}
            onRequestStatusChange={updateRequestStatus}
        />
    );

    if (loader) {
        return <FullScreenLoader
            title={"Please wait fetching requests..."}
            loading={loader} />
    }

    //console.log('requestData', requestData)

    return (
        <SafeAreaView style={styles.container}>

            <View style={{
                padding: 16,
                flex: 1
            }}>
                <Text style={{
                    fontFamily: fonts.fontsType.semiBold,
                    fontSize: scaleHeight(18),
                    color: theme.dark.white,
                    marginHorizontal: 16
                }}>Service Requests</Text>
                {
                    requestData?.length > 0 ? <FlatList
                        data={requestData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item + index}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                    /> : <EmptyListComponent title={"No Requests Yet."} />
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

export default BuddyHomeContent;
