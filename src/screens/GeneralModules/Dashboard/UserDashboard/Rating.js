import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-elements';
import fonts from '../../../../styles/fonts';
import { Rating } from 'react-native-ratings';
import { resetNavigation } from '../../../../utils/resetNavigation';
import useBackHandler from '../../../../utils/useBackHandler';
import { SCREENS } from '../../../../constant/constants';
import { theme } from '../../../../assets';
import RatingListItem from '../../../../components/RatingListItem'
import ProfileProgressBar from '../../../../components/ProfileProgressBar';
import Header from '../../../../components/Header';
import { scaleHeight, scaleWidth } from '../../../../styles/responsive';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import CustomStarIcon from '../../../../components/CustomStarIcon';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRating } from '../../../../redux/UserDashboard/getRatingSlice';
import FullScreenLoader from '../../../../components/FullScreenLoader';
import EmptyListComponent from '../../../../components/EmptyListComponent';


const data = Array(10).fill({
    id: Math.random().toString(), // Ensure each item has a unique id
    profilePic: 'https://placebeard.it/250/250',
    name: 'John Doe',
    rating: 4.5,
    comment: 'Having good time with you.',
});

const MyReviewScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { ratings, loading } = useSelector((state) => state.getRating);

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
        return true;
    };
    useBackHandler(handleBackPress);

    useEffect(() => {
        dispatch(getAllRating({
            page: 1,
            limit: 10,
            buddy_id: 37
        }))
    }, [dispatch])

    if (loading) {
        return <FullScreenLoader loading={loading} title={"Please wait..."} />
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header
                onPress={() => {
                    handleBackPress()
                }}
                title={"Ratings"}
                customTextStyle={styles.headerText} />

            {ratings?.ratings?.data?.length > 0 ? <ScrollView style={styles.scrollView}>

                <View style={styles.ratingContainer}>
                    <Text style={styles.avgRating}>
                        {ratings?.avg_rating}
                    </Text>

                    <View style={styles.starRating}>
                        <StarRatingDisplay
                            disabled={true}
                            rating={3}
                            maxStars={5}
                            color={theme.dark.secondary}
                            starSize={28}
                            StarIconComponent={(props) => <CustomStarIcon {...props} />}
                        />
                    </View>

                    <Text style={styles.overallRatings}>
                        {"Overall Ratings"}
                    </Text>

                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={ratings?.ratings?.data}
                        renderItem={({ item }) => (
                            <RatingListItem
                                profilePic={item?.image_url}
                                name={item?.full_name}
                                rating={item?.stars}
                                comment={item?.comment}

                            />
                        )}
                        keyExtractor={(item, index) => item + index}
                    />
                </View>




            </ScrollView> :
                <EmptyListComponent title={"Rating not found."} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },
    headerText: {
        fontFamily: fonts.fontsType.semiBold,
        marginStart: scaleWidth(95),
    },
    scrollView: {
        flex: 1,
    },
    ratingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    avgRating: {
        fontFamily: fonts.fontsType.bold,
        fontSize: 41,
        color: theme.dark.white,
    },
    starRating: {
        flex: 1,
        marginTop: 10,
    },
    overallRatings: {
        fontFamily: fonts.fontsType.medium,
        fontSize: 16,
        color: theme.dark.inputLabel,
        marginTop: 15,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    emptyList: {
        flex: 1,
    }
});

export default MyReviewScreen;
