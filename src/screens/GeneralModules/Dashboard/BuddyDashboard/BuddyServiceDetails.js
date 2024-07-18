import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import {  locationPin } from '../../../../assets/images';
import { theme } from '../../../../assets';
import DetailItem from '../../../../components/DetailItem';
import Button from '../../../../components/ButtonComponent';
import { resetNavigation } from '../../../../utils/resetNavigation';
import { scaleHeight, scaleWidth } from '../../../../styles/responsive';
import fonts from '../../../../styles/fonts';
import Header from '../../../../components/Header';
import HorizontalDivider from '../../../../components/HorizontalDivider';
import { SCREENS } from '../../../../constant/constants';
import useBackHandler from '../../../../utils/useBackHandler';
import { ScrollView } from 'react-native-gesture-handler';
import { useAlert } from '../../../../providers/AlertContext';
import { useDispatch, useSelector } from 'react-redux';
import { setRoute } from '../../../../redux/appSlice';
import { getUserDetailByService } from '../../../../redux/BuddyDashboard/getUserDetailByServiceSlice';
import { calculateAge } from '../../../../utils/calculateAge';
import moment from 'moment';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { getServiceRating } from '../../../../redux/getServiceRatingSlice';
import CustomStarIcon from '../../../../components/CustomStarIcon';
import FullScreenLoader from '../../../../components/FullScreenLoader';
import { actionCancelPayment } from '../../../../redux/BuddyDashboard/actionCancelPaymentSlice';
import { acceptRejectUserRequest } from '../../../../redux/BuddyDashboard/acceptRejectUserRequestSlice';
import { requestForPayment } from '../../../../redux/BuddyDashboard/requestForPaymentSlice';
import { color } from '@rneui/base';

const BuddyServiceDetails = ({ navigation }) => {
    const dispatch = useDispatch();
    const { currentRoute } = useSelector((state) => state.app)
    const { userDetail, loading } = useSelector((state) => state.getUserDetailByService)
    const { ratingDetail, loading: ratingLoader, error } = useSelector((state) => state.getServiceRating)
    const { loading: acceptPaymentLoader } = useSelector((state) => state.actionCancelPayment)
    const { loading: requestPaymentLoader } = useSelector((state) => state.requestForPayment)
    const { showAlert } = useAlert();
    const categories = userDetail?.category;
    const [requestLoader, setRequestLoader] = useState(false);
    const [requestStatus, setRequestStatus] = useState('');

    const handleBackPress = () => {
        if (currentRoute?.route === SCREENS.MAIN_DASHBOARD) {
            resetNavigation(navigation, currentRoute?.route, { screen: SCREENS.SERVICES })
        } else {
            resetNavigation(navigation, currentRoute?.route)
        }
        return true;
    };
    useBackHandler(handleBackPress);


    useEffect(() => {
        dispatch(getUserDetailByService(currentRoute?.request_id));
        dispatch(getServiceRating(currentRoute?.request_id));
    }, [dispatch, currentRoute])



    const getColorByStatus = (status) => {

        switch (status) {
            case "ACCEPTED":
                return '#00E200';

            case "REJECTED":
                return '#FF2A04';


            case "CANCELLED":
                return '#FF2A04';


            case "PENDING":
                return '#F9D800';

            case "REQUESTED":
                return '#F9D800';

            case "REQUEST_BACK":
                return '#4285F4';

            default:
                return '#00000000';
        }
    }

    const getNameByStatus = (status) => {
        switch (status) {
            case "ACCEPTED":
                return 'Accepted';

            case "REJECTED":
                return 'Rejected';

            case "CANCELLED":
                return 'CANCELLED';

            case "PENDING":
                return 'Pending';

            case "REQUEST_BACK":
                return 'Requested by me';

            case "REQUESTED":
                return 'Pending';

            default:
                return ''; // Default color if status doesn't match
        }
    }


    const handleCancelPayment = () => {

        dispatch(setRoute({
            route: SCREENS.BUDDY_SERVICE_DETAIL,
            request_id: userDetail?.id,
            user_id: userDetail?.user_id,
        }))
        resetNavigation(navigation, SCREENS.PAYMENT_CANCELLATION);
    }

    const handleAcceptPayment = () => {

        const payload = {
            request_id: userDetail?.id,
            user_id: userDetail?.user_id,
            action: "ACCEPTED"
        }
        dispatch(actionCancelPayment(payload)).then((result) => {
            if (result?.payload?.status === "success") {
                showAlert("Success", "success", result?.payload?.message);
                setTimeout(() => {
                    handleBackPress();
                }, 3000);

            } else if (result?.payload?.status === "error") {
                showAlert("Error", "error", result?.payload?.message)
            }
        })
    }

    const handleRequestBack = () => {
        const payload = {
            request_id: userDetail?.id,
            route: SCREENS.BUDDY_SERVICE_DETAIL
        }
        dispatch(setRoute(payload))
        resetNavigation(navigation, SCREENS.BUDDY_SEND_REQUEST)
    }

    const handleAcceptRejectRequest = (status) => {
        setRequestLoader(true);
        setRequestStatus(status);
        const acceptRejectPayload = {
            request_id: userDetail?.id,
            status: status
        }

        dispatch(acceptRejectUserRequest(acceptRejectPayload)).then((result) => {
            setRequestLoader(false);
            if (result?.payload?.status === "success") {
                showAlert("Success", "success", result?.payload?.message)

                setTimeout(() => {
                    handleBackPress();
                }, 3000);

            } else {
                setRequestLoader(false);
                showAlert("Error", "error", result?.payload?.message)
            }
        })
    }

    const handleRequestForPayment = () => {
        dispatch(requestForPayment(userDetail?.id)).then((result) => {
            if (result?.payload?.status === "success") {
                showAlert("Success", "success", result?.payload?.message)
                setTimeout(() => {
                    handleBackPress();
                }, 3000);

            } else {
                showAlert("Error", "error", result?.payload?.message)
            }
        })
    }

    const renderLoader = () => {
        return <FullScreenLoader
            title={"Please wait fetching user detail..."}
            loading={loading} />
    }

    return (
        <SafeAreaView style={styles.mianContainer}>
            <Header
                onPress={() => {
                    handleBackPress();
                }}
                title={"Service Details"}
            />
            <HorizontalDivider customStyle={{
                marginTop: scaleHeight(10)
            }} />
            {
                loading ? renderLoader() : <ScrollView style={{
                    flex: 1
                }}>
                    <View style={styles.container}>

                        <View style={styles.profileSection}>
                            <View style={styles.profileView}>
                                <Image
                                    style={styles.profileImage}
                                    source={{ uri: userDetail?.user?.images[0]?.image_url }} // Replace with actual image URL
                                />
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileName}>{`${userDetail?.user?.full_name} (${calculateAge(userDetail?.user?.dob)})`}</Text>
                                <Text style={styles.profileGender}>{userDetail?.user?.gender}</Text>
                            </View>

                            {/*completed section here... */}

                            {userDetail?.status === "COMPLETED" && <TouchableOpacity style={{
                                width: scaleWidth(46),
                                height: scaleHeight(25),
                                borderRadius: 30,
                                backgroundColor: userDetail?.is_released ? theme.dark.secondary : '#D2D2D2',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 12
                            }}>
                                <Icon name="check" type="material" size={16} color={theme.dark.black} />
                            </TouchableOpacity>}
                        </View>

                        <HorizontalDivider />

                        <View style={styles.locationSection}>
                            <Icon style={{
                                top: 8
                            }} name="location-on" type="material" color={theme.dark.secondary} />
                            <Text style={styles.locationText}>{userDetail?.location}</Text>
                        </View>
                        <HorizontalDivider customStyle={{
                            marginTop: scaleHeight(18)
                        }} />
                        <View style={styles.categorySection}>
                            <Text style={{
                                color: theme.dark.secondary,
                                fontSize: scaleHeight(18),
                                fontFamily: fonts.fontsType.medium,
                                marginHorizontal: 10

                            }}>
                                Category
                            </Text>
                            <TouchableOpacity
                                style={[styles.containerItem]}
                            >
                                <Image source={{ uri: categories?.image_url }} style={styles.image} />
                                <Text style={styles.text}>{categories?.name}</Text>
                            </TouchableOpacity>
                        </View>
                        <HorizontalDivider customStyle={{
                            marginTop: scaleHeight(10)
                        }} />
                        <View style={styles.detailsSection}>
                            <DetailItem label="Date" value={moment(userDetail?.booking_date?.split('T')[0]).format('DD/MM/YYYY')} />
                            <DetailItem label="Time" value={moment(userDetail?.booking_time, 'HH:mm').format('hh:mm A')} />
                            <DetailItem label="Hours For Booking" value={`${userDetail?.hours} HOURS`} />
                            <DetailItem label="Total Price" value={`$${userDetail?.booking_price}`} />
                            <DetailItem label="Status" value={getNameByStatus(userDetail?.status)} customTextStyle={{
                                color: getColorByStatus(userDetail?.status)
                            }} />
                        </View>
                        <HorizontalDivider />

                        {/* requested section here... */}

                        {userDetail?.status === "REQUEST_BACK" && <View>

                            <View style={[styles.categorySection, { marginTop: 10, flexDirection: 'row' }]}>
                                <Text style={{
                                    color: theme.dark.secondary,
                                    fontSize: scaleHeight(18),
                                    fontFamily: fonts.fontsType.medium,
                                    marginHorizontal: 10,
                                    marginBottom: 10,
                                    flex: 1

                                }}>
                                    Request by me
                                </Text>

                                <View style={[styles.statusContainer, { backgroundColor: getColorByStatus(userDetail?.buddy_request_back?.buddy_status) },]}>
                                    <Text style={styles.statusText}>
                                        {getNameByStatus(userDetail?.buddy_request_back?.buddy_status)}
                                    </Text>
                                </View>

                            </View>

                            <DetailItem label="Date" value={moment(userDetail?.buddy_request_back?.booking_date?.split('T')[0]).format('DD/MM/YYYY')} />
                            <DetailItem label="Time" value={moment(userDetail?.buddy_request_back?.booking_time, 'HH:mm').format('hh:mm A')} />
                            <DetailItem label="Location" />
                            <View style={{
                                flexDirection: 'row',
                                marginTop: scaleHeight(10),
                                marginHorizontal: -5,
                            }}>

                                <Image
                                    resizeMode='contain'
                                    style={{

                                        width: scaleWidth(22),
                                        height: scaleHeight(22),
                                        alignSelf: 'center',

                                    }} source={locationPin} />

                                <Text style={{
                                    color: theme.dark.white,
                                    fontSize: scaleHeight(14),
                                    fontFamily: fonts.fontsType.regular,
                                    marginHorizontal: 5
                                }}>
                                    {userDetail?.buddy_request_back?.buddy_location}
                                </Text>

                            </View>
                        </View>
                        }
                        {/* completed section 2 here... */}
                        {userDetail?.status === "COMPLETED" && ratingDetail != null && <View style={[styles.categorySection, { marginTop: 10 }]}>
                            <Text style={{
                                color: theme.dark.secondary,
                                fontSize: scaleHeight(18),
                                fontFamily: fonts.fontsType.medium,
                                marginHorizontal: 10,
                                marginBottom: 10

                            }}>
                                Rating of Services
                            </Text>

                            <StarRatingDisplay
                                disabled={true}
                                rating={ratingDetail?.stars ? ratingDetail?.stars : 0}
                                maxStars={5}
                                color={theme.dark.secondary}
                                starSize={20}
                                StarIconComponent={(props) => <CustomStarIcon {...props} />}
                                style={{
                                    marginTop: 5,
                                    marginStart: 2
                                }}
                            />

                            <Text style={{
                                color: theme.dark.inputLabel,
                                fontSize: scaleHeight(16),
                                fontFamily: fonts.fontsType.light,
                                marginHorizontal: 10

                            }}>
                                {ratingDetail?.comment}
                            </Text>

                        </View>}

                        {/* payment rejected section here... */}

                        {userDetail?.canceled_status === "REJECTED" && <View style={[styles.categorySection, { marginTop: 10 }]}>
                            <Text style={{
                                color: theme.dark.secondary,
                                fontSize: scaleHeight(18),
                                fontFamily: fonts.fontsType.medium,
                                marginHorizontal: 10,
                                marginBottom: 10

                            }}>
                                Reason of cancellation
                            </Text>

                            <Text style={{
                                color: theme.dark.inputLabel,
                                fontSize: scaleHeight(16),
                                fontFamily: fonts.fontsType.light,
                                marginHorizontal: 10

                            }}>
                                {userDetail?.canceled_reason}
                            </Text>

                        </View>}

                        <View style={styles.buttonSection}>
                            {userDetail?.status === "PAID" && <Button
                                onPress={() => {
                                    handleRequestForPayment();
                                }}
                                title={"Request for Payment"}
                                loading={requestPaymentLoader}
                                customStyle={{
                                    width: '95%',
                                    top: scaleHeight(30)
                                }}
                                textCustomStyle={{
                                }}
                            />}


                            {(userDetail?.status === "REQUESTED" &&
                                userDetail?.status !== "ACCEPTED" &&
                                userDetail?.status !== "REJECTED" &&
                                (userDetail?.buddy_request_back?.buddy_status !== "ACCEPTED" &&
                                    userDetail?.buddy_request_back?.buddy_status !== "REJECTED")) &&
                                <Button
                                    onPress={handleRequestBack}
                                    title={"Request Back"}
                                    customStyle={{
                                        width: '95%',
                                        top: scaleHeight(30)
                                    }}
                                    textCustomStyle={{}}
                                />
                            }


                            {/* {userDetail?.status !== "ACCEPTED" && userDetail?.status !== "REJECTED" && userDetail?.status == "REQUESTED" && <Button
                                onPress={() => {
                                    handleRequestBack();
                                }}
                                title={"Request Back"}
                                customStyle={{
                                    width: '95%',
                                    top: scaleHeight(30)
                                }}
                                textCustomStyle={{
                                }}
                            />} */}

                            {/* these button show here if status requested or pending... */}

                            {userDetail?.status === "REQUESTED" && <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                //marginTop: '40%'
                                //marginBottom: scaleHeight(-160)
                            }}>

                                <Button
                                    onPress={() => {
                                        setRequestStatus("REJECTED");
                                        handleAcceptRejectRequest("REJECTED")
                                    }}
                                    title={"Reject"}
                                    loading={requestStatus === "REJECTED" && requestLoader}
                                    isBgTransparent={true}
                                    customStyle={{
                                        width: '48%',
                                        borderWidth: 1,
                                        borderColor: theme.dark.secondary,
                                        backgroundColor: theme.dark.transparentBg,
                                        marginHorizontal: '2%',
                                    }}
                                    textCustomStyle={{
                                        color: theme.dark.secondary,

                                    }}
                                />

                                <Button
                                    onPress={() => {
                                        setRequestStatus("ACCEPTED");
                                        handleAcceptRejectRequest("ACCEPTED")
                                    }}
                                    title={"Accept"}
                                    loading={requestStatus === "ACCEPTED" && requestLoader}
                                    customStyle={{
                                        width: '48%',
                                    }}
                                />

                            </View>}


                            {/* these button show here if status cancelled and paid... */}

                            {userDetail?.canceled_status === "REJECTED" && userDetail?.status === "PAID" && <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                //marginBottom: scaleHeight(-160)
                            }}>

                                <Button
                                    onPress={() => {
                                        handleCancelPayment();
                                    }}
                                    title={"Reject"}
                                    customStyle={{
                                        width: '48%',
                                        borderWidth: 1,
                                        borderColor: theme.dark.secondary,
                                        backgroundColor: theme.dark.transparentBg,
                                        marginHorizontal: '2%',
                                    }}
                                    textCustomStyle={{
                                        color: theme.dark.secondary,

                                    }}
                                />

                                <Button
                                    loading={acceptPaymentLoader}
                                    onPress={() => {
                                        handleAcceptPayment();
                                    }}
                                    title={"Accept"}
                                    customStyle={{
                                        width: '48%',
                                    }}
                                />

                            </View>}


                        </View>
                    </View>
                </ScrollView>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mianContainer: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        color: theme.dark.secondary,
        fontSize: 20,
        marginLeft: 10,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,

    },
    profileView: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: theme.dark.secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileInfo: {
        marginLeft: 10,
        flex: 1
    },
    profileName: {
        color: theme.dark.white,
        fontSize: scaleHeight(18),
        fontFamily: fonts.fontsType.semiBold
    },
    profileGender: {
        color: theme.dark.white,
        fontSize: scaleHeight(14),
        fontFamily: fonts.fontsType.regular
    },
    locationSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(10),
    },
    locationText: {
        color: theme.dark.white,
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(15),
        width: '90%',
        alignSelf: 'center',
        top: 8

    },
    categorySection: {
        marginBottom: 10,
    },
    categoryTitle: {
        color: theme.dark.secondary,
        fontSize: 16,
        marginBottom: 10,
    },
    categoryTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#555',
        padding: 10,
        borderRadius: 5,
    },
    categoryText: {
        color: '#fff',
        marginLeft: 5,
    },
    detailsSection: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    detailLabel: {
        color: theme.dark.secondary
    },
    detailValue: {
        color: '#fff',
    },
    buttonSection: {
        alignItems: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
    },
    containerItem: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.dark.inputBg,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.dark.inputLabel,
        padding: 10,
        margin: 5,
        marginTop: 10
        //flex: 0.5,
    },
    text: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(15),
        color: theme.dark.inputLabel,
    },
    image: {
        width: 15,
        height: 15,
        marginRight: 10,
    },
    statusContainer: {
        height: scaleHeight(30),
        backgroundColor: '#00E200',
        borderRadius: 20,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusText: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(12),
        color: theme.dark.white,
        alignSelf: 'center'
    },
});

export default BuddyServiceDetails;
