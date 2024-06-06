import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import useBackHandler from '../../../utils/useBackHandler';
import { theme } from '../../../assets';
import CustomLayout from '../../../components/CustomLayout';
import fonts from '../../../styles/fonts';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import HorizontalDivider from '../../../components/HorizontalDivider';
import Button from '../../../components/ButtonComponent';
import ProfileProgressBar from '../../../components/ProfileProgressBar';
import DynamicOptionSelector from '../../../components/DynamicOptionSelector';

const BuddyYourInterests = ({ navigation }) => {
    const gender = ["Date", "Lunch", "Dinner", "Movie Night"]
    const [selectedGender, setSelectedGender] = useState(null);

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.SELECT_LANGUAGE)
        return true;
    };
    useBackHandler(handleBackPress);

    const handleLoginNavigation = () => {
        resetNavigation(navigation, SCREENS.SIGNUP)
    }

    const handleItemSelected = (item) => {
        console.log(item)
        setSelectedGender(item);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ProfileProgressBar progress={90} onPress={() => {
                resetNavigation(navigation, SCREENS.SELECT_LANGUAGE)
            }} />
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Select Your Interests
                    </Text>
                    <Text style={styles.subTitle}>
                        Select Your Interests and Unlock Your Perfect Matches!
                    </Text>

                    <DynamicOptionSelector
                        items={gender}
                        onItemSelected={handleItemSelected}
                    />

                    {/* {
                        gender?.map((item, index) => {

                            return <TouchableOpacity
                                key={index}
                                style={{

                                    flexDirection: "row",
                                    alignItems: "center",
                                    backgroundColor: theme.dark.inputBg,
                                    height: 45,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: theme.dark.text,
                                    marginTop: scaleHeight(30)

                                }}>

                                <Text
                                    style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(18),
                                        color: theme.dark.inputLabel,
                                        marginHorizontal: scaleWidth(20)
                                    }}
                                >{item}</Text>

                            </TouchableOpacity>

                        })
                    } */}



                </View>

                <View style={styles.buttonContainer}>

                    <HorizontalDivider
                        customStyle={{
                            marginTop: 40
                        }} />

                    <Button
                        onPress={() => {
                            //handleselectedGender();
                            resetNavigation(navigation, SCREENS.AMOUNT)
                        }}
                        title={'Continue'}
                    />
                </View>

            </CustomLayout>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.background
    },
    contentContainer: {
        padding: 25,
        flex: 1
    },
    welcomeText: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(22),
        color: theme.dark.white,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(14),
        color: theme.dark.heading,
        marginTop: 5
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: scaleHeight(130),
        marginBottom: scaleHeight(20)
    }
});


export default BuddyYourInterests;
