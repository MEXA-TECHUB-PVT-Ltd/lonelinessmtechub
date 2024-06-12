//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../assets';
import { dummyImg } from '../assets/images';
import { scaleHeight, scaleWidth } from '../styles/responsive';
import fonts from '../styles/fonts';
import Button from './ButtonComponent';
import { resetNavigation } from '../utils/resetNavigation';
import { SCREENS } from '../constant/constants';
import { useAlert } from '../providers/AlertContext';

// create a component
const RequestListItem = ({ item, navigation }) => {
    const { showAlert } = useAlert();

    const getColorByStatus = (status) => {
        switch (status) {
            case "Accepted":
                return '#00E200';

            case "Rejected":
                return '#FF2A04';

            case "Requested":
                return '#4285F4';

            default:
                return '#00000000'; // Default color if status doesn't match
        }
    }
    return (
        <TouchableOpacity
            onPress={() => {
                resetNavigation(navigation, SCREENS.SERVICE_DETAILS)
            }}
            style={styles.container}>
            <View style={styles.row}>
                <Image
                    style={styles.image}
                    source={dummyImg}
                    resizeMode='cover'
                />

                <View style={styles.flex1}>
                    <View style={styles.headerRow}>
                        <Text style={styles.userName}>
                            {item?.name}
                        </Text>
                        <View style={[styles.statusContainer, { backgroundColor: getColorByStatus(item?.status) },]}>
                            <Text style={styles.statusText}>
                                {item?.status !== "Pending" && item?.status}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.categoryText}>
                            Category
                        </Text>
                        <Text style={styles.infoText}>
                            {item?.category}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.categoryText}>
                            Date/Time
                        </Text>
                        <Text style={styles.infoText}>
                            {item?.dateTime}
                        </Text>
                    </View>
                </View>
            </View>

            {item?.status === 'Pending' && <View style={styles.buttonRow}>
                <Button
                    onPress={() => {
                    }}
                    title={"Reject Request"}
                    customStyle={styles.rejectButton}
                    textCustomStyle={styles.rejectButtonText}
                />

                <Button
                    title={"Accept Request"}
                    customStyle={styles.acceptButton}
                    textCustomStyle={styles.acceptButtonText}
                />
            </View>}
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.dark.inputBackground,
        borderWidth: 1,
        borderColor: theme.dark.inputLabel,
        margin: 8,
        borderRadius: 20,
        padding: 8,
        marginTop: 10
    },
    row: {
        flexDirection: 'row'
    },
    image: {
        width: scaleWidth(60),
        height: scaleHeight(70),
        borderRadius: 12
    },
    flex1: {
        flex: 1
    },
    headerRow: {
        flexDirection: 'row',
        marginHorizontal: 8,
        // marginTop: 5
    },
    userName: {
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(16),
        color: theme.dark.white,
        flex: 1
    },
    statusContainer: {
        height: scaleHeight(25),
        backgroundColor: '#00E200',
        borderRadius: 20,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusText: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(12),
        color: theme.dark.white,
        alignSelf: 'center'
    },
    infoRow: {
        flexDirection: 'row',
        marginHorizontal: 8,
        marginTop: 5
    },
    categoryText: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(15),
        color: theme.dark.white,
        flex: 1
    },
    infoText: {
        fontFamily: fonts.fontsType.regular,
        fontSize: scaleHeight(14),
        color: theme.dark.inputLabel
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    rejectButton: {
        width: '48%',
        height: scaleHeight(35),
        borderWidth: 1,
        borderColor: theme.dark.secondary,
        backgroundColor: theme.dark.transparentBg,
        marginHorizontal: '2%',
        marginBottom: 0,
        marginTop: 0
    },
    rejectButtonText: {
        color: theme.dark.secondary,
        fontSize: scaleHeight(14)
    },
    acceptButton: {
        width: '48%',
        height: scaleHeight(35),
        marginBottom: 0,
        marginTop: 0
    },
    acceptButtonText: {
        fontSize: scaleHeight(14)
    }
});

//make this component available to the app
export default RequestListItem;
