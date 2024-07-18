import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from '../../../../../providers/AlertContext';
import { resetNavigation } from '../../../../../utils/resetNavigation';
import { SCREENS } from '../../../../../constant/constants';
import useBackHandler from '../../../../../utils/useBackHandler';
import { getAllCategories } from '../../../../../redux/getAllCategoriesSlice';
import CustomLayout from '../../../../../components/CustomLayout';
import CategorySelector from '../../../../../components/CategorySelector';
import HorizontalDivider from '../../../../../components/HorizontalDivider';
import Button from '../../../../../components/ButtonComponent';
import { theme } from '../../../../../assets';
import fonts from '../../../../../styles/fonts';
import { scaleHeight } from '../../../../../styles/responsive';


const UpdateInterests = ({ navigation }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.getCategories)
    const { showAlert } = useAlert();
    const { dataPayload } = useSelector((state) => state.app);
    const [selectedInterests, setSelectedInterests] = useState([]);

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.SELECT_LANGUAGE)
        return true;
    };
    useBackHandler(handleBackPress);


    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])


    useEffect(() => {
        if (dataPayload?.category_ids?.length) {
            const preSelectedInterests = categories?.filter(interest => dataPayload.category_ids.includes(interest.id));
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
    }

    return (
        <SafeAreaView style={styles.container}>
            <CustomLayout>
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>
                        Select Your Interests
                    </Text>
                    <Text style={styles.subTitle}>
                        Select Your Interests and Unlock Your Perfect Matches!
                    </Text>

                    <CategorySelector
                        items={categories}
                        onItemSelected={handleItemSelected}
                        selectedItems={selectedInterests}
                    />

                </View>

            </CustomLayout>

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
    }
});


export default UpdateInterests;
