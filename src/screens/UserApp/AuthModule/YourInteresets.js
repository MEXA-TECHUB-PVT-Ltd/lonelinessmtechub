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
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from '../../../providers/AlertContext';
import { setDataPayload } from '../../../redux/appSlice';
import CategorySelector from '../../../components/CategorySelector';

const YourInteresets = ({ navigation }) => {
    const dispatch = useDispatch();
    const { showAlert } = useAlert();
    const { dataPayload } = useSelector((state) => state.app);
    const interests = [
        { id: 1, name: 'Date' },
        { id: 2, name: 'Lunch' },
        { id: 3, name: 'Dinner' },
        { id: 4, name: 'Movie Night' }
    ];
    const [selectedInterests, setSelectedInterests] = useState([]);

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.GENDER_LOOKING)
        return true;
    };
    useBackHandler(handleBackPress)

    useEffect(() => {
        if (dataPayload?.category_ids?.length) {
            const preSelectedInterests = interests.filter(interest => dataPayload.category_ids.includes(interest.id));
            setSelectedInterests(preSelectedInterests);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataPayload]);

    const handleItemSelected = (item) => {
        setSelectedInterests(item)
    };



    const handleSelectedInterests = () => {
        if (selectedInterests?.length == 0) {
            showAlert("Error", "error", "Please select at least 1 category.")
            return
        }
        let categoryIds = [];
        selectedInterests?.map((item) => {
            categoryIds.push(item?.id)
        })
        const newPayload = { ...dataPayload, category_ids: categoryIds };
        dispatch(setDataPayload(newPayload));
        resetNavigation(navigation, SCREENS.ENABLE_LOCATION)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ProfileProgressBar progress={80} onPress={() => {
                resetNavigation(navigation, SCREENS.GENDER_LOOKING)
            }} />
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Select Your Interests
                    </Text>
                    <Text style={styles.subTitle}>
                        Select Your Interests and Unlock Your Perfect Matches!
                    </Text>

                    {/* <DynamicOptionSelector
                        items={interests}
                        onItemSelected={handleItemSelected}
                    /> */}

                    <CategorySelector
                        items={interests}
                        onItemSelected={handleItemSelected}
                        selectedItems={selectedInterests}
                    />

                </View>

                <View style={styles.buttonContainer}>

                    <HorizontalDivider
                        customStyle={{
                            marginTop: 40
                        }} />

                    <Button
                        onPress={() => {
                            handleSelectedInterests();
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


export default YourInteresets;
