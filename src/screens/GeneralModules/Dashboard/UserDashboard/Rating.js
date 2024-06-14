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
import { ratingStar, stars } from '../../../../assets/images';


const data = Array(10).fill({
    id: Math.random().toString(), // Ensure each item has a unique id
    profilePic: 'https://placebeard.it/250/250',
    name: 'John Doe',
    rating: 4.5,
    comment: 'Having good time with you.',
});

const MyReviewScreen = ({ navigation }) => {


    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.HOME })
        return true;
    };
    useBackHandler(handleBackPress);



    return (
        <SafeAreaView style={styles.container}>

            <Header
                onPress={() => {
                    handleBackPress()
                }}
                title={"Ratings"}
                customTextStyle={{
                    fontFamily: fonts.fontsType.semiBold,
                    marginStart: scaleWidth(95)
                }} />

            <ScrollView>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{
                        fontFamily: fonts.fontsType.bold,
                        fontSize: 41,
                        color: theme.dark.white
                    }}>
                        {"4.5"}
                    </Text>

                    <View style={{
                        flex: 1,
                        marginTop:10
                    }}>
                        <Image style={{
                            height: 26,
                            width: scaleWidth(160)
                        }} source={stars}
                            resizeMode='contain'
                        />
                    </View>

                    {/* <Rating
                        type='star'
                        readonly={true}
                        startingValue={4.5}
                        imageSize={25}
                        minValue={0}
                        ratingCount={5}
                        style={{ alignSelf: 'center', marginTop: 10 }}
                    /> */}

                    <Text style={{
                        fontFamily: fonts.fontsType.medium,
                        fontSize: 16,
                        color: theme.dark.inputLabel,
                        marginTop: 15
                    }}>
                        {"Overall Ratings"}
                    </Text>

                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item }) => (
                            <RatingListItem
                                profilePic={item.profilePic}
                                name={item.name}
                                rating={item.rating}
                                comment={item.comment}

                            />
                        )}
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    }
});

export default MyReviewScreen;
