//import liraries
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { blockUser, dummy1, dummy2, dummyImg, likeHome, locationPin, ratingStar } from '../../../../assets/images';
import { scaleHeight, scaleWidth } from '../../../../styles/responsive';
import { theme } from '../../../../assets';
import fonts from '../../../../styles/fonts';
import Button from '../../../../components/ButtonComponent';
import { resetNavigation } from '../../../../utils/resetNavigation';
import { SCREENS } from '../../../../constant/constants';
import DetailItem from '../../../../components/DetailItem';
import CategoryList from '../../../../components/CategoryList';
import HorizontalDivider from '../../../../components/HorizontalDivider';
import Header from '../../../../components/Header';
import useBackHandler from '../../../../utils/useBackHandler';
import { useAlert } from '../../../../providers/AlertContext';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomModal from '../../../../components/CustomModal';

const images = [
    dummyImg,
    dummy1,
    dummy2
];

const categories = [
    { id: '4', text: 'Movie Night', image: likeHome },
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const UserServiceDetails = ({ navigation }) => {
    const { showAlert } = useAlert()
    const [activeIndex, setActiveIndex] = useState(0);
    const refRBSheet = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.SERVICES })
        return true;
    };
    useBackHandler(handleBackPress);

    const handleOpenModal = () => {
        setModalVisible(true);
        refRBSheet.current.close()
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };


    const renderItem = ({ item, index }) => (
        <View style={[styles.carouselItem]}>
            <Image source={item} style={styles.carouselImage} resizeMode="cover" />
        </View>
    );

    const renderSheet = () => {
        return <RBSheet
            ref={refRBSheet}
            height={100}
            openDuration={250}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(128, 128, 128, 0.80)',
                },
                container: {
                    padding: 20,
                    borderRadius: 20,
                    backgroundColor: theme.dark.background,
                    marginBottom: 20,
                    width: '90%',
                    alignSelf: 'center'
                }
            }}
        >

            <TouchableOpacity
                onPress={() => {
                    resetNavigation(navigation, SCREENS.REPORT_BUDDY)
                }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text style={{
                    fontFamily: fonts.fontsType.regular,
                    fontSize: scaleHeight(16),
                    color: theme.dark.white
                }}>Report Buddy</Text>
            </TouchableOpacity>
            <HorizontalDivider />
            <TouchableOpacity
                onPress={() => {
                   handleOpenModal()
                }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text style={{
                    fontFamily: fonts.fontsType.regular,
                    fontSize: scaleHeight(16),
                    color: theme.dark.white
                }}>Block Buddy</Text>
            </TouchableOpacity>
        </RBSheet>
    }


    const handleButtonClick = () => {
        handleCloseModal();
        setTimeout(() => {
            showAlert("Success", 'success', "Buddy Blocked Successfully.")
        }, 1000);

    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                onPress={() => {
                    resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.SERVICES })
                }}
                title={"Service Details"}
                icon={"more-vert"}
                iconPress={() => {
                    refRBSheet.current.open()
                }}
            />
            <ScrollView style={{ flex: 1 }}>
                <View style={[styles.carouselContainer,]}>

                    <FlatList
                        data={images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(e) => {
                            const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
                            setActiveIndex(index);
                        }}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />


                    <View style={styles.dotContainer}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.indicator,
                                    index === activeIndex && styles.activeIndicator,
                                ]}
                            />
                        ))}
                    </View>


                    <View style={styles.detailContainer}>

                        <View style={styles.profileDescription}>


                            <Text style={{
                                color: theme.dark.white,
                                fontSize: scaleHeight(22),
                                fontFamily: fonts.fontsType.semiBold,

                            }}>
                                Olivia Williams (24)
                            </Text>

                            <TouchableOpacity
                                onPress={() => {
                                    resetNavigation(navigation, SCREENS.RATING)
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>

                                <Image
                                    resizeMode='cover'
                                    style={{

                                        width: scaleWidth(18),
                                        height: scaleHeight(18),
                                        alignSelf: 'center',
                                        marginHorizontal: 5
                                    }} source={ratingStar} />

                                <Text style={{
                                    color: theme.dark.inputLabel,
                                    fontSize: scaleHeight(15),
                                    fontFamily: fonts.fontsType.medium
                                }}>
                                    4.5
                                </Text>

                            </TouchableOpacity>

                        </View>
                        <HorizontalDivider />

                        <View style={styles.profileDescription}>


                            <Text style={{
                                color: theme.dark.secondary,
                                fontSize: scaleHeight(18),
                                fontFamily: fonts.fontsType.medium,

                            }}>
                                About
                            </Text>

                        </View>

                        <Text style={{
                            color: theme.dark.inputLabel,
                            fontSize: scaleHeight(15),
                            fontFamily: fonts.fontsType.light,
                            lineHeight: scaleHeight(28),
                            marginBottom: scaleHeight(10)
                        }}>
                            Hi there! I’m Olivia, a 24-year-old graphic designer in NYC.I love all things creative, from my work to cooking and exploring the city’s art scene.
                        </Text>

                        <HorizontalDivider />

                        <DetailItem label="Gender" value="Female" />
                        <DetailItem label="Height" value="5'4" />
                        <DetailItem label="Weight" value="50 kg" />
                        <DetailItem label="Languages" value="English, French, German" />


                        <Text style={{
                            color: theme.dark.secondary,
                            fontSize: scaleHeight(18),
                            fontFamily: fonts.fontsType.medium,
                            marginTop: scaleHeight(10)

                        }}>
                            Categories
                        </Text>

                        <View style={{
                            marginHorizontal: -5,
                            marginTop: scaleHeight(5)
                        }}>
                            <CategoryList
                                categories={categories}
                            />

                        </View>

                        <HorizontalDivider />


                        <Text style={{
                            color: theme.dark.secondary,
                            fontSize: scaleHeight(18),
                            fontFamily: fonts.fontsType.medium,
                            marginTop: scaleHeight(20)

                        }}>
                            Where to Meet
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: scaleHeight(10),
                            marginHorizontal: -5,
                            marginBottom: scaleHeight(5)
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
                                Randall Peterson 1234 Maple, Street, Spr...
                            </Text>

                        </View>

                        <HorizontalDivider />

                        <DetailItem label="Date" value="24/05/2024" />
                        <DetailItem label="Time" value="03:00 PM" />
                        <DetailItem label="Hour" value="2 hours" />
                        <DetailItem label="Status" value="Request" />

                        <HorizontalDivider />

                        <Text style={{
                            color: theme.dark.secondary,
                            fontSize: scaleHeight(18),
                            fontFamily: fonts.fontsType.medium,
                            marginTop: scaleHeight(20)

                        }}>
                            Request From Buddy
                        </Text>

                        <DetailItem label="Date" value="24/05/2024" />
                        <DetailItem label="Time" value="03:00 PM" />
                        <DetailItem label="Location" />
                        <View style={{
                            flexDirection: 'row',
                            marginTop: scaleHeight(10),
                            marginHorizontal: -5,
                            marginBottom: scaleHeight(-120)
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
                                Randall Peterson 1234 Maple, Street, Spr...
                            </Text>

                        </View>



                    </View>

                </View>


            </ScrollView>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20
                //marginBottom: scaleHeight(-160)
            }}>

                <Button
                    onPress={() => {
                        showAlert("Success", 'success', "Request rejected successfully.")
                    }}
                    title={"Reject"}
                    customStyle={{
                        width: '48%',
                        borderWidth: 1,
                        borderColor: theme.dark.secondary,
                        backgroundColor: theme.dark.transparentBg,
                        marginRight: '2%',
                        marginBottom: scaleHeight(0)
                    }}
                    textCustomStyle={{
                        color: theme.dark.secondary,

                    }}
                />

                <Button
                    onPress={() => {
                        showAlert("Success", 'success', "Request accepted successfully.")
                    }}
                    title={"Accept"}
                    customStyle={{
                        width: '48%',
                        marginBottom: scaleHeight(0)
                    }}
                />

            </View>
            {renderSheet()}
            <CustomModal
                isVisible={modalVisible}
                onClose={handleCloseModal}
                headerTitle={"Block User?"}
                imageSource={blockUser}
                isParallelButton={true}
                text={`Are you sure you want to Block Alex Linderson?`}
                parallelButtonText1={"Cancel"}
                parallelButtonText2={"Yes, Block"}
                parallelButtonPress1={() => {
                    handleCloseModal()
                }}
                parallelButtonPress2={() => {
                    handleButtonClick()
                }}
            />

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lottieView: {
        flex: 1,
        width: scaleWidth(268),
        height: scaleHeight(264),
        alignSelf: 'center'
    },
    imageCircle: {
        width: scaleWidth(118), // Ensure this matches the height scaling for a perfect circle
        height: scaleWidth(118), // Use scaleWidth to keep the dimensions consistent
        borderRadius: scaleWidth(118) / 2, // Half of the width/height to make it a circle
        borderWidth: 4,
        borderColor: theme.dark.secondary,
        alignSelf: 'center',
        position: 'absolute',
        top: scaleHeight(280),
        justifyContent: 'center'
    },
    imageStyle: {
        width: scaleWidth(110),
        height: scaleWidth(110),
        borderRadius: scaleWidth(110) / 2,
        alignSelf: 'center'
    },
    carouselContainer: {
        flex: 1,
        marginBottom: scaleHeight(120)

    },
    carouselItem: {
        width: scaleWidth(375),
        height: scaleHeight(400),
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '85%',
        height: '75%',
        borderRadius: 20,
        alignSelf: 'center'
    },
    dotContainer: {
        position: 'absolute',
        top: scaleHeight(390),
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: 20,
        height: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        marginHorizontal: 5,
        alignSelf: 'center'
    },

    detailContainer: {
        padding: 30,
        //top: scaleHeight(-20)
    },
    profileDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scaleHeight(5)
    },

    slider: {
        marginBottom: 15,
    },

    verticleLine: {
        height: '60%',
        width: 1,
        backgroundColor: '#909090',
        alignSelf: 'center'
    },
    label: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(17),
        color: theme.dark.inputLabel,
        marginHorizontal: 8,
        top: scaleHeight(20)
    },
    labelContainer: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: theme.dark.transparentBg,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: theme.dark.secondary
    },
    activeIndicator: {
        width: 24,
        height: 8,
        borderRadius: 5,
        backgroundColor: theme.dark.secondary,
    },
});

//make this component available to the app
export default UserServiceDetails;
