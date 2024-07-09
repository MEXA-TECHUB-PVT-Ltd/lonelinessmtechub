import React, { useEffect, useRef, useState } from 'react';
import {
    Image, SafeAreaView, StyleSheet, Dimensions,
    View, FlatList, Text, TouchableOpacity,
    ScrollView, TextInput, Animated, findNodeHandle, UIManager
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { scaleHeight, scaleWidth } from '../../../../styles/responsive';
import { theme } from '../../../../assets';
import {
    bellHome,
    blockUser,
    chatHome,
    disLikeHome,
    disLikeLabel,
    dummyImg,
    filterHome,
    homeLogo,
    likeHome,
    likeLabel,
    locationPin,
    lockImg,
    ratingStar,
    sendHome,
    warningImg
} from '../../../../assets/images';
import fonts from '../../../../styles/fonts';
import { resetNavigation } from '../../../../utils/resetNavigation';
import { SCREENS } from '../../../../constant/constants';
import DetailItem from '../../../../components/DetailItem';
import CategoryList from '../../../../components/CategoryList';
import Button from '../../../../components/ButtonComponent';
import { color } from '@rneui/base';
import CustomModal from '../../../../components/CustomModal';
import Modal from 'react-native-modal';
import HorizontalDivider from '../../../../components/HorizontalDivider';
import CustomRangeSlider from '../../../../components/CustomSlider';
import CheckBox from '../../../../components/CheckboxComponent';
import CustomTextInput from '../../../../components/TextInputComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNearbyBuddy } from '../../../../redux/UserDashboard/getAllNearbyBuddySlice';
import { getAddressByLatLong } from '../../../../redux/getAddressByLatLongSlice';
import { setIsAppOpened } from '../../../../redux/appOpenedSlice';
import { setRoute } from '../../../../redux/appSlice';
import { userBuddyAction } from '../../../../redux/userBuddyActionSlice';
import { useAlert } from '../../../../providers/AlertContext';
import Geolocation from '@react-native-community/geolocation';
import { applyFilterTogetBuddies } from '../../../../redux/UserDashboard/applyFilterTogetBuddiesSlice';
import Spinner from '../../../../components/Spinner';
import { setIsPremium } from '../../../../redux/accountSubscriptionSlice';
import { likeDislikeBuddy } from '../../../../redux/UserDashboard/likeDislikeBuddySlice';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const UserHomeContent = ({ showFilterModal, setFilterModal, setFilter }) => {
    const dispatch = useDispatch();
    const { response, loading } = useSelector((state) => state.nearByBuddy)
    const { filteredData, filterLoader } = useSelector((state) => state.applyFilter)
    const blockUserLoader = useSelector((state) => state.userBuddyAction)
    const { userLoginInfo } = useSelector((state) => state.auth)
    const { address } = useSelector((state) => state.getAddress)
    const { isAppOpened } = useSelector((state) => state.appOpened)
    const { isPremiumPlan } = useSelector((state) => state.accountSubscription)
    const { showAlert } = useAlert();
    const lottieRef = useRef(null);
    const navigation = useNavigation();
    const [showCarousel, setShowCarousel] = useState(false);
    const [isfilterApplied, setFilterApplied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [min, setMin] = useState(20);
    const [max, setMax] = useState(80);
    const [hieghtFtSelected, setHeightFtSelected] = useState(true);
    const [hieghtInSelected, setHeightInSelected] = useState(false);
    const [weightKgSelected, setWeightKgSelected] = useState(true);
    const [weightLbSelected, setWeightLbSelected] = useState(false);

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [userCurrentIndex, setUserCurrentIndex] = useState(0);
    const [currentUser, setCurrentUser] = useState(response?.data[0]);
    const scrollOffsetY = useRef(0);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [action, setAction] = useState({ index: null, type: null });
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scaleY = useRef(new Animated.Value(1)).current;
    const rotateZ = useRef(new Animated.Value(0)).current;
    const { is_subscribed } = userLoginInfo?.user;
    const [selectedOption, setSelectedOption] = useState('');
    const [form, setForm] = useState({
        category: '',
        city: '',
        language: '',
        height_ft: '',
        height_in: '',
        weight_kg: '',
        weight_lb: '',
        weight_unit: '',
        top_rated_profile: false,
        top_liked_profile: false,
        gender: '',
        latitude: 0,
        longitude: 0,
        distance: 500000000,
        page: 1,
        limit: 10,
        min_age: 0,
        max_age: 0

    });

    const getAllNearByBuddies = async () => {
        const getPosition = () => new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(resolve, reject);
        });
        const { coords: { latitude, longitude } } = await getPosition();
        const payload = {
            latitude,
            longitude
        }
        dispatch(getAllNearbyBuddy(payload));
    }

    useEffect(() => {
        getAllNearByBuddies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() => {
        if (currentUser)
            dispatch(getAddressByLatLong({
                lat: currentUser?.location?.latitude,
                long: currentUser?.location?.longitude
            }));
    }, [dispatch, currentUser])

    useEffect(() => {
        if (isfilterApplied) {
            setCurrentUser(filteredData?.data[userCurrentIndex]);
        } else {
            setCurrentUser(response?.data[userCurrentIndex]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCurrentIndex, response, isfilterApplied]);


    function updateCurrentUser(updatedUser) {
        setCurrentUser(updatedUser);
    }

    const handleToggleKg = () => {
        setWeightKgSelected(true);
        setWeightLbSelected(false);
    };

    const handleToggleLb = () => {
        setWeightKgSelected(false);
        setWeightLbSelected(true);
    };

    const like = (index) => {
        setAction({ index, type: 'like' });
        setTimeout(() => {
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -50, // Move up
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -screenWidth, // Slide out to the left
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                let newImageUrls = [...currentUser.image_urls];
                newImageUrls.splice(index, 1);
                updateCurrentUser({ ...currentUser, image_urls: newImageUrls });
                //currentUser?.image_urls?.splice(index, 1);
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
                translateX.setValue(0);
                translateY.setValue(0);
                setAction({ index: null, type: null });
                if (isfilterApplied) {
                    setUserCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData?.data?.length);
                } else {
                    setUserCurrentIndex((prevIndex) => (prevIndex + 1) % response?.data?.length);
                }

            });
        }, 500);
    };

    const handleDislike = (index) => {
        setAction({ index, type: 'dislike' });
        setTimeout(() => {
            Animated.parallel([
                // Rotation animation
                Animated.timing(rotateZ, {
                    toValue: -45, // Rotate to -45 degrees (counter-clockwise)
                    duration: 1000, // Duration of rotation animation
                    useNativeDriver: true,
                }),
                // Translation animation to move the image to the left
                Animated.timing(translateX, {
                    toValue: -screenWidth, // Move the image to the left
                    duration: 1000, // Duration of translation animation
                    useNativeDriver: true,
                }),
            ]).start(() => {
                let newImageUrls = [...currentUser.image_urls];
                newImageUrls.splice(index, 1);
                updateCurrentUser({ ...currentUser, image_urls: newImageUrls });
                // After the animation, remove the image from the list
                // currentUser?.image_urls?.splice(index, 1);
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0)); // Adjust the active index
                rotateZ.setValue(0); // Reset the rotation value for the next use
                translateX.setValue(0); // Reset the translation value for the next use
                setAction({ index: null, type: null }); // Reset the action
                if (isfilterApplied) {
                    setUserCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData?.data?.length);
                } else {
                    setUserCurrentIndex((prevIndex) => (prevIndex + 1) % response?.data?.length);
                }
            });
        }, 500); // Wait for 3 seconds before sliding out
    };

    const handleScroll = (event) => {
        const currentOffsetY = event.nativeEvent.contentOffset.y;
        const direction = currentOffsetY > scrollOffsetY.current ? 'down' : 'up';
        setScrollDirection(direction);
        scrollOffsetY.current = currentOffsetY;
    };

    useEffect(() => {
        scrollOffsetY.current = 0;
    }, []);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenModal1 = () => {
        setModalVisible1(true);
    };

    const handleCloseModal1 = () => {
        setModalVisible1(false);
    };

    const handleOpenModal2 = () => {
        setModalVisible2(true);
    };

    const handleCloseModal2 = () => {
        setModalVisible2(false);
    };

    const handleOpenModal3 = () => {
        setModalVisible3(true);
    };

    const handleCloseModal3 = () => {
        setModalVisible3(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (lottieRef.current) {
                lottieRef.current.pause();
                setShowCarousel(true);
                dispatch(setIsAppOpened(true))
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    const renderItem = ({ item, index }) => (
        <Animated.View
            style={[styles.carouselItem, {
                transform: [{ translateX }, { translateY }, { scaleY },
                {
                    rotateZ: action.index === index && action.type === 'dislike' ? rotateZ.interpolate({
                        inputRange: [0, 45],
                        outputRange: ['0deg', '45deg'],
                    }) : '0deg'
                }, // Apply rotation if it's a dislike action
                ]
            }]}>
            <Image
                source={{ uri: item }}
                style={styles.carouselImage}
                resizeMode="cover"
            />
            <LinearGradient
                colors={['transparent', theme.dark.primary]}
                style={styles.gradientOverlay}
            />
            {action.index === index && (
                <View style={styles.labelContainer}>
                    <Image source={action.type === 'like' ? likeLabel : disLikeLabel} style={{
                        width: scaleWidth(173),
                        height: scaleHeight(82)
                    }} resizeMode="contain" />
                </View>
            )}

        </Animated.View>
    );


    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const onChange = (min, max) => {
        setMin(Math.round(min))
        setMax(Math.round(max))
    };

    const handleCheckBoxStatusChange = (formField, label, isChecked) => {
        //console.log(`${label} is ${isChecked ? 'checked' : 'unchecked'}`);
        if (formField === "top_rated_profile" || formField === "top_liked_profile") {
            handleChange(formField, isChecked);
        } else {
            handleChange(formField, label);
        }

    };

    const applyFilter = () => {
        setFilterModal(false)
        setFilter(true)
        setFilterApplied(true)
        const filterPayload = { ...form, min_age: min, max_age: max };
        dispatch(applyFilterTogetBuddies(filterPayload));
    }

    const resetFilter = () => {
        getAllNearByBuddies();
        setFilterModal(false)
        setFilter(false)
        setFilterApplied(false)
    }

    const renderFilterModal = () => {
        return <Modal
            backdropOpacity={0.90}
            backdropColor={'rgba(85, 85, 85, 0.95)'}
            isVisible={showFilterModal}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationInTiming={1000}
            animationOutTiming={1000}
        >
            <View style={{
                backgroundColor: '#111111',
                width: '110%',
                height: '110%',
                alignSelf: 'center',
                elevation: 20,
                padding: 20,
                marginTop: scaleHeight(120),
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,

            }}>

                <Icon
                    name='close'
                    size={24}
                    color={theme.dark.white}
                    style={{
                        alignSelf: 'flex-end'
                    }}

                    onPress={() => {
                        setFilterModal(false)
                    }}
                />

                <Text style={{
                    fontFamily: fonts.fontsType.semiBold,
                    fontSize: scaleHeight(20),
                    color: theme.dark.white,
                    alignSelf: 'center'
                }}>
                    Appy Filter
                </Text>

                <HorizontalDivider customStyle={{
                    marginTop: 15
                }} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                    style={{
                        flex: 1,
                        marginBottom: scaleHeight(40)
                    }}>

                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,

                    }}>
                        <Text style={{
                            fontFamily: fonts.fontsType.semiBold,
                            fontSize: scaleHeight(17),
                            color: theme.dark.white,
                            flex: 1
                        }}>
                            Age Range
                        </Text>
                        <Text style={{
                            fontFamily: fonts.fontsType.regular,
                            fontSize: scaleHeight(17),
                            color: theme.dark.inputBackground
                        }}>
                            {`${min} - ${max}`}
                        </Text>
                    </View>

                    <CustomRangeSlider
                        min={0}
                        max={100}
                        step={1}
                        initialLow={20}
                        initialHigh={80}
                        onValueChange={onChange}
                    />

                    <HorizontalDivider customStyle={{
                        marginTop: 60
                    }} />

                    <View style={{
                        marginHorizontal: 15
                    }}>
                        <Text style={{
                            fontFamily: fonts.fontsType.semiBold,
                            fontSize: scaleHeight(17),
                            color: theme.dark.white,
                        }}>
                            Show Me
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            justifyContent: 'space-between'
                        }}>
                            <CheckBox
                                onStatusChange={handleCheckBoxStatusChange}
                                label={"Men"}
                                mode="single"
                                formField={"gender"}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                labelStyle={{
                                    color: theme.dark.inputBackground,
                                    fontFamily: fonts.fontsType.semiBold,
                                    fontSize: scaleHeight(15),
                                }} />
                            <CheckBox
                                onStatusChange={handleCheckBoxStatusChange}
                                label={"Women"}
                                mode="single"
                                formField={"gender"}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                labelStyle={{
                                    color: theme.dark.inputBackground,
                                    fontFamily: fonts.fontsType.semiBold,
                                    fontSize: scaleHeight(15),
                                }} />
                            <CheckBox
                                onStatusChange={handleCheckBoxStatusChange}
                                label={"Other"}
                                mode="single"
                                formField={"gender"}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                labelStyle={{
                                    color: theme.dark.inputBackground,
                                    fontFamily: fonts.fontsType.semiBold,
                                    fontSize: scaleHeight(15),
                                }} />
                        </View>
                    </View>

                    <HorizontalDivider customStyle={{
                        marginTop: 20
                    }} />

                    <View style={{
                        marginHorizontal: 15,
                        marginTop: 10
                    }}>
                        <CheckBox
                            onStatusChange={handleCheckBoxStatusChange}
                            label={"Top liked Profiles"}
                            formField={"top_liked_profile"}
                            labelStyle={{
                                color: theme.dark.white,
                                fontFamily: fonts.fontsType.semiBold,
                                fontSize: scaleHeight(15),
                            }}
                            checkBoxStyle={{
                                backgroundColor: theme.dark.white
                            }}
                        />
                    </View>

                    <HorizontalDivider customStyle={{
                        marginTop: 20
                    }} />

                    <View style={{
                        marginHorizontal: 15,
                        marginTop: 10
                    }}>
                        <CheckBox
                            onStatusChange={handleCheckBoxStatusChange}
                            label={"Top Rated Profiles"}
                            formField={"top_rated_profile"}
                            labelStyle={{
                                color: theme.dark.white,
                                fontFamily: fonts.fontsType.semiBold,
                                fontSize: scaleHeight(15),
                            }}
                            checkBoxStyle={{
                                backgroundColor: theme.dark.white
                            }}
                        />
                    </View>

                    <HorizontalDivider customStyle={{
                        marginTop: 20
                    }} />

                    <CustomTextInput
                        label={'Category'}
                        placeholder={"Select Category"}
                        identifier={'category'}
                        value={form.category}
                        onValueChange={(value) => handleChange('category', value)}
                        mainContainer={{ marginTop: 15 }}
                        iconComponent={
                            <MaterialIcons
                                style={{
                                    marginEnd: 8

                                }} name={"keyboard-arrow-down"} size={24}
                                color={theme.dark.text} />
                        }
                    />

                    <HorizontalDivider customStyle={{
                        marginTop: 20
                    }} />

                    {/* // height wieght */}

                    <View style={{ marginTop: scaleHeight(10) }}>

                        <Text style={styles.label}>{'Height'}</Text>

                        <View

                            style={{

                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: theme.dark.white,
                                height: 45,
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: theme.dark.text,
                                marginTop: scaleHeight(30)

                            }}>

                            <View style={{ flexDirection: 'row', marginHorizontal: scaleWidth(10), flex: 1 }}>

                                <TextInput
                                    style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(14),
                                        color: theme.dark.text,
                                        marginHorizontal: 10
                                    }}
                                    maxLength={2}
                                    placeholder='00'
                                    keyboardType='number-pad'
                                    placeholderTextColor={theme.dark.text}
                                    value={form.height_ft}
                                    onChangeText={(value) => handleChange('height_ft', value)}
                                />

                                <View style={styles.verticleLine}></View>

                                <TextInput
                                    style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(14),
                                        color: theme.dark.text
                                    }}
                                    maxLength={2}
                                    placeholder='00'
                                    keyboardType='number-pad'
                                    placeholderTextColor={theme.dark.text}
                                    value={form.height_in}
                                    onChangeText={(value) => handleChange('height_in', value)}
                                />

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: theme.dark.secondary,
                                width: scaleWidth(70),
                                height: '70%',
                                marginEnd: scaleWidth(10),
                                justifyContent: 'space-evenly',
                            }}>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: theme.dark.secondary,
                                        width: scaleWidth(35),
                                        height: '100%',
                                        alignSelf: 'center',
                                        borderBottomLeftRadius: 30,
                                        borderTopLeftRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(12),
                                        color: theme.dark.black,
                                        alignSelf: 'center'

                                    }}>Ft</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#333333',
                                        width: scaleWidth(35),
                                        height: '100%',
                                        alignSelf: 'center',
                                        borderBottomEndRadius: 30,
                                        borderTopEndRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(12),
                                        color: theme.dark.white,
                                        alignSelf: 'center'

                                    }}>In</Text>
                                </TouchableOpacity>

                            </View>


                        </View>

                        <Text style={styles.label}>{'Weight'}</Text>

                        <View

                            style={{

                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: theme.dark.white,
                                height: 45,
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: theme.dark.text,
                                marginTop: scaleHeight(30)

                            }}>

                            <View style={{ flexDirection: 'row', marginHorizontal: scaleWidth(10), flex: 1 }}>

                                <TextInput
                                    style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(14),
                                        color: theme.dark.text,
                                        marginHorizontal: 10
                                    }}
                                    maxLength={2}
                                    keyboardType='number-pad'
                                    placeholder='00'
                                    placeholderTextColor={theme.dark.text}
                                    value={form.weight_kg}
                                    onChangeText={(value) => handleChange('weight_kg', value)}
                                />

                                <View style={styles.verticleLine}></View>

                                <TextInput
                                    style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(14),
                                        color: theme.dark.text
                                    }}
                                    maxLength={2}
                                    keyboardType='number-pad'
                                    placeholder='00'
                                    placeholderTextColor={theme.dark.text}
                                    value={form.weight_lb}
                                    onChangeText={(value) => handleChange('weight_lb', value)}
                                />

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: theme.dark.secondary,
                                width: scaleWidth(70),
                                height: '70%',
                                marginEnd: scaleWidth(10),
                                justifyContent: 'space-evenly',
                            }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        handleToggleKg();
                                    }}
                                    style={{
                                        backgroundColor: weightKgSelected ? theme.dark.secondary : '#333333',
                                        width: scaleWidth(35),
                                        height: '100%',
                                        alignSelf: 'center',
                                        borderBottomLeftRadius: 30,
                                        borderTopLeftRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(12),
                                        color: weightKgSelected ? theme.dark.black : theme.dark.white,
                                        alignSelf: 'center'

                                    }}>Kg</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        handleToggleLb();
                                    }}
                                    style={{
                                        backgroundColor: weightLbSelected ? theme.dark.secondary : '#333333',
                                        width: scaleWidth(35),
                                        height: '100%',
                                        alignSelf: 'center',
                                        borderBottomEndRadius: 30,
                                        borderTopEndRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{
                                        fontFamily: fonts.fontsType.medium,
                                        fontSize: scaleHeight(12),
                                        color: weightLbSelected ? theme.dark.black : theme.dark.white,
                                        alignSelf: 'center'

                                    }}>Lb</Text>
                                </TouchableOpacity>

                            </View>


                        </View>

                    </View>

                    <HorizontalDivider customStyle={{
                        marginTop: 20
                    }} />

                    <CustomTextInput
                        label={'City'}
                        placeholder={"Select City"}
                        identifier={'city'}
                        value={form.city}
                        onValueChange={(value) => handleChange('city', value)}
                        mainContainer={{ marginTop: 10 }}
                    // iconComponent={
                    //     <MaterialIcons
                    //         style={{
                    //             marginEnd: 8

                    //         }} name={"keyboard-arrow-down"} size={24}
                    //         color={theme.dark.text} />
                    // }
                    />

                    <HorizontalDivider customStyle={{
                        marginTop: 20
                    }} />

                    <CustomTextInput
                        label={'Language'}
                        placeholder={"Select Language"}
                        identifier={'language'}
                        value={form.language}
                        onValueChange={(value) => handleChange('language', value)}
                        mainContainer={{ marginTop: 10 }}
                        iconComponent={
                            <MaterialIcons
                                style={{
                                    marginEnd: 8

                                }} name={"keyboard-arrow-down"} size={24}
                                color={theme.dark.text} />
                        }
                    />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20
                    }}>

                        <Button
                            onPress={() => {
                                resetFilter();
                            }}
                            title={"Reset"}
                            customStyle={{
                                width: '48%',
                                marginHorizontal: '2%',
                                borderWidth: 1,
                                borderColor: theme.dark.secondary,
                                backgroundColor: theme.dark.transparentBg,
                            }}
                            textCustomStyle={{
                                color: theme.dark.secondary,
                            }}

                        />

                        <Button
                            onPress={() => {
                                applyFilter();
                            }}
                            title={"Apply"}
                            customStyle={{
                                width: '48%',
                            }} />

                    </View>



                </ScrollView>

            </View>
        </Modal>
    }

    const getBackgroundColor = () => {
        if (scrollDirection === 'up') {
            return theme.dark.primary;  // Color when scrolling up
        } else if (scrollDirection === 'down') {
            return theme.dark.primary;    // Color when scrolling down
        } else if (scrollOffsetY.current = 0) {
            return '#4C4615';   // Default color
        }
    };

    function calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    }

    const convertMetersToKm = (meters) => {
        return (meters / 1000).toFixed(1);
    };

    const images = currentUser?.image_urls || [];

    const handlePress = () => {
        dispatch(setRoute({
            route: SCREENS.MAIN_DASHBOARD,
            buddy_images: currentUser?.image_urls
        }))
        resetNavigation(navigation, SCREENS.IMAGE_VIEWER);
    };

    const handleRequestBuddy = () => {

        if (currentUser?.block_status !== "BLOCK") {
            if (is_subscribed) {
                dispatch(setRoute({
                    route: SCREENS.MAIN_DASHBOARD,
                    buddy_id: currentUser?.id,
                    hourly_rate: currentUser?.hourly_rate
                }))
                resetNavigation(navigation, SCREENS.SEND_REQUEST)
            } else {
                handleOpenModal1();
            }
        } else {
            showAlert("Error", "error", "You have blocked this Buddy.")
        }
    }

    const handleReportBuddy = () => {

        dispatch(setRoute({
            route: SCREENS.MAIN_DASHBOARD,
            buddy_id: currentUser?.id,
            buddy_name: currentUser?.full_name
        }))
        resetNavigation(navigation, SCREENS.REPORT_BUDDY)
    }
    const handlePremium = () => {
        handleCloseModal1()
        resetNavigation(navigation, SCREENS.PREMIUM);
    }
    const handleBlockUser = () => {
        dispatch(userBuddyAction({
            buddy_id: currentUser?.id,
            //reason: "Other",
            type: "BLOCK" // BLOCK OR REPORT -- 
        })).then((result) => {
            if (result?.payload?.status === "success") {
                showAlert("Success", "success", result?.payload?.message);
                handleCloseModal();
                let updatedUser = { ...currentUser, block_status: "BLOCK" };
                setCurrentUser(updatedUser);
            } else if (result?.payload?.status === "error") {
                showAlert("Error", "error", result?.payload?.message)
            }
        })
    }

    const handleLikeDislike = (likeDislikeStatus) => {

        const likeDislikePayload = {
            buddy_id: currentUser?.id,
            like_status: likeDislikeStatus
        }
        dispatch(likeDislikeBuddy(likeDislikePayload)).then((result) => {
            console.log(result?.payload)
            if (result?.payload?.status === "success") {

                let updatedUser = { ...currentUser, is_liked: likeDislikeStatus };
                setCurrentUser(updatedUser);
            }
        })



    }

    return (
        <LinearGradient
            colors={[theme.dark.primary, '#4C4615', '#4C4615']}
            locations={[0.19, 0.7, 0.7]}
            style={styles.gradient}
        >
            {filterLoader ? <Spinner
                isTimer={false}
                label={`Please wait... ${'\n'}We are applying filtering the list.`}
                lottieCustomStyle={{
                    width: scaleWidth(150),
                    height: scaleHeight(150),
                }}
            /> : <SafeAreaView style={styles.container}>

                {!isAppOpened ? (
                    <>
                        <LottieView
                            ref={lottieRef}
                            style={styles.lottieView}
                            source={require('../../../../assets/ripple_lottie.json')}
                            autoPlay
                            loop
                            speed={0.5}
                        />

                        <View style={styles.imageCircle}>
                            <Image
                                style={styles.imageStyle}
                                resizeMode='cover'
                                source={dummyImg}
                            />
                        </View>

                        <View style={{
                            flex: 1,
                            bottom: scaleHeight(180),
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}>
                            <Text style={styles.lottieText}>
                                Finding people near you...
                            </Text>
                        </View>
                    </>
                ) : (
                    <ScrollView
                        onScroll={handleScroll}
                        scrollEventThrottle={1}
                        style={[styles.carouselContainer, { backgroundColor: getBackgroundColor() }]}>
                        <FlatList
                            data={currentUser?.image_urls}
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


                        {currentUser?.image_urls?.length > 0 && <View style={styles.dotContainer}>
                            {currentUser?.image_urls?.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.dot,
                                        { backgroundColor: index === activeIndex ? theme.dark.secondary : 'rgba(17, 17, 17, 1)' },
                                    ]}
                                />
                            ))}
                        </View>}

                        <View style={styles.overlay}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.nameText}>
                                    {`${currentUser?.full_name} (${calculateAge(currentUser?.dob)})`}
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    handleOpenModal2();
                                }}>
                                    <Image source={chatHome} style={{
                                        width: scaleWidth(60),
                                        height: scaleHeight(60),
                                        alignSelf: 'center',
                                        marginEnd: 20,
                                        top: scaleHeight(20)

                                    }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.distanceText}>
                                {`${convertMetersToKm(currentUser?.distance)} km away`}
                            </Text>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (currentUser?.block_status !== "BLOCK") {
                                            if (userCurrentIndex === 2) {
                                                dispatch(setIsPremium(false))
                                            }
                                            if (!is_subscribed && !isPremiumPlan) {
                                                handleOpenModal1();
                                            } else {
                                                handleLikeDislike(false)
                                                handleDislike(activeIndex)
                                            }
                                        } else {
                                            showAlert("Error", "error", "You have blocked this Buddy.")
                                        }

                                    }}
                                    style={styles.iconButton}>
                                    {/* <Icon name="close" type="material" color="#ff4d4d" /> */}
                                    <Image source={disLikeHome}
                                        resizeMode='contain'
                                        style={{
                                            width: scaleWidth(50),
                                            height: scaleHeight(50),
                                            alignSelf: 'center',
                                            //right: scaleWidth(-20),

                                        }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log('isPremiumPlan', isPremiumPlan)

                                        if (currentUser?.block_status !== "BLOCK") {
                                            if (userCurrentIndex === 2) {
                                                dispatch(setIsPremium(false))
                                            }
                                            if (!is_subscribed && !isPremiumPlan) {
                                                handleOpenModal1();
                                            } else {
                                                handleLikeDislike(true)
                                                like(activeIndex);
                                            }
                                        } else {
                                            showAlert("Error", "error", "You have blocked this Buddy.")
                                        }

                                    }}
                                    style={styles.iconButton2}>
                                    {/* <Icon name="favorite" type="material" color={theme.dark.secondary} /> */}
                                    <Image source={likeHome}
                                        resizeMode='contain'
                                        style={{
                                            width: scaleWidth(60),
                                            height: scaleHeight(60),
                                            alignSelf: 'center',
                                            //right: scaleWidth(-20),

                                        }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleRequestBuddy()
                                    }}
                                    style={styles.iconButton3}>
                                    {/* <Icon name="send" type="material" color="#4da6ff" /> */}
                                    <Image source={sendHome}
                                        resizeMode='contain'
                                        style={{
                                            width: scaleWidth(50),
                                            height: scaleHeight(50),
                                            alignSelf: 'center',
                                            //right: scaleWidth(-20),

                                        }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.detailContainer}>

                            <View style={styles.profileDescription}>


                                <Text style={{
                                    color: theme.dark.secondary,
                                    fontSize: scaleHeight(18),
                                    fontFamily: fonts.fontsType.medium,

                                }}>
                                    About
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
                                        {currentUser?.avg_rating}
                                    </Text>

                                </TouchableOpacity>

                            </View>

                            <Text style={{
                                color: theme.dark.inputLabel,
                                fontSize: scaleHeight(15),
                                fontFamily: fonts.fontsType.light,
                                lineHeight: scaleHeight(28),
                                marginBottom: scaleHeight(20)
                            }}>
                                {currentUser?.about}
                            </Text>

                            <DetailItem label="Gender" value={currentUser?.gender} />
                            <DetailItem label="Height" value={`${currentUser?.height_ft}'${currentUser?.height_in}`} />
                            <DetailItem label="Weight" value={`${currentUser?.weight} ${currentUser?.weight_unit}`} />
                            <DetailItem label="Hourly Rate" value={`$${currentUser?.hourly_rate}`} />
                            <DetailItem label="Languages" value={`${currentUser?.languages !== null ? currentUser?.languages : ''}`} />
                            {/* <DetailItem label="Location" value={`${currentUser?.location?.city && currentUser?.location?.city}, ${currentUser?.location?.city && currentUser?.location?.city}`} /> */}

                            <View style={{
                                flexDirection: 'row',
                                marginTop: scaleHeight(20),
                                marginHorizontal: -5
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
                                    fontSize: scaleHeight(16),
                                    fontFamily: fonts.fontsType.medium,
                                    marginHorizontal: 5
                                }}>

                                    {currentUser?.location?.country && currentUser?.location?.city ?
                                        `${currentUser.location.country}, ${currentUser.location.city}` :
                                        (address?.city || address?.town) && address?.country ?
                                            `${address.city || address.town}, ${address.country}` :
                                            'Location not available'
                                    }
                                </Text>

                            </View>

                            <Text style={{
                                color: theme.dark.secondary,
                                fontSize: scaleHeight(18),
                                fontFamily: fonts.fontsType.medium,
                                marginTop: scaleHeight(40)

                            }}>
                                Categories
                            </Text>

                            <View style={{
                                marginHorizontal: -5,
                                marginTop: scaleHeight(5)
                            }}>
                                <CategoryList
                                    categories={currentUser?.categories}
                                    isPress={false}
                                />

                            </View>

                            <View>
                                {images?.length > 0 && (
                                    <TouchableOpacity onPress={handlePress}>
                                        <Image
                                            style={{
                                                width: '100%',
                                                height: scaleHeight(300),
                                                marginTop: scaleHeight(10),
                                                borderRadius: 10
                                            }}
                                            source={{ uri: images[0] }}
                                        />
                                    </TouchableOpacity>
                                )}

                                {images?.length > 1 && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {images?.slice(1, 3).map((image, index) => (
                                            image && <TouchableOpacity key={index} onPress={handlePress}>
                                                <Image
                                                    style={{
                                                        width: scaleWidth(150),
                                                        height: scaleHeight(230),
                                                        marginTop: scaleHeight(10),
                                                        borderRadius: 10
                                                    }}
                                                    source={{ uri: image }}
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>

                            <Button
                                onPress={() => {
                                    handleRequestBuddy();
                                }}
                                title={"Send Request"}
                                customStyle={{
                                    width: '95%',
                                    top: scaleHeight(30)
                                }}
                                textCustomStyle={{
                                }}
                            />

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: scaleHeight(-160)
                            }}>

                                <Button
                                    onPress={() => {
                                        handleReportBuddy();
                                    }}
                                    title={"Report"}
                                    customStyle={{
                                        width: '48%',
                                        borderWidth: 1,
                                        borderColor: theme.dark.secondary,
                                        backgroundColor: theme.dark.transparentBg,
                                    }}
                                    textCustomStyle={{
                                        color: theme.dark.secondary,
                                        marginRight: '2%',
                                    }}
                                />

                                <Button title={"Block"}
                                    onPress={() => {
                                        handleOpenModal();
                                    }}
                                    customStyle={{
                                        width: '48%',
                                        borderWidth: 1,
                                        borderColor: theme.dark.secondary,
                                        backgroundColor: theme.dark.transparentBg
                                    }}
                                    textCustomStyle={{
                                        color: theme.dark.secondary
                                    }}
                                />

                            </View>

                        </View>

                    </ScrollView>
                )}

                <CustomModal
                    isVisible={modalVisible1}
                    onClose={handleCloseModal1}
                    headerTitle={"Unlock More Friendships!"}
                    imageSource={lockImg}
                    text={`Want to meet more amazing friends? Unlock additional profiles with our premium access. Discover endless possibilities and connections!`}
                    buttonText="Go Premium"
                    isParallelButton={false}
                    buttonAction={() => {
                        handlePremium();
                    }}
                />

                <CustomModal
                    isVisible={modalVisible2}
                    onClose={handleCloseModal2}
                    headerTitle={"Opps!"}
                    imageSource={warningImg}
                    isParallelButton={true}
                    text={`Unlock the conversation for only $1 and dive into an engaging chat experience with us! 💬✨`}
                    parallelButtonText1={"Cancel"}
                    parallelButtonText2={"Pay Now!"}
                    parallelButtonPress1={() => {
                        handleCloseModal2()
                    }}
                    parallelButtonPress2={() => {
                        handleCloseModal2()
                        handleOpenModal3();
                    }}
                />

                <CustomModal
                    isVisible={modalVisible3}
                    onClose={handleCloseModal3}
                    headerTitle={"Payment Method"}
                    imageSource={warningImg}
                    isParallelButton={true}
                    text={`Do you want to pay through your wallet?`}
                    parallelButtonText1={"No"}
                    parallelButtonText2={"Yes, Pay"}
                    parallelButtonPress1={() => {
                        handleCloseModal3()
                    }}
                    parallelButtonPress2={() => {

                    }}
                />

                <CustomModal
                    isVisible={modalVisible}
                    //loading={blockUserLoader}
                    onClose={handleCloseModal}
                    headerTitle={"Block User?"}
                    imageSource={blockUser}
                    isParallelButton={true}
                    text={`Are you sure you want to Block ${currentUser?.full_name}?`}
                    parallelButtonText1={"Cancel"}
                    parallelButtonText2={"Yes, Block"}
                    parallelButtonPress1={() => {
                        handleCloseModal()
                    }}
                    parallelButtonPress2={() => {
                        handleBlockUser();
                    }}
                />

                {renderFilterModal()}

            </SafeAreaView>}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
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
    lottieText: {
        alignSelf: 'center',
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(18),
        color: theme.dark.white,
    },
    imageCircle: {
        width: scaleWidth(118),
        height: scaleWidth(118),
        borderRadius: scaleWidth(118) / 2,
        borderWidth: 4,
        borderColor: theme.dark.secondary,
        alignSelf: 'center',
        position: 'absolute',
        top: scaleHeight(285),
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
        //backgroundColor: 'rgba(17, 17, 17, 1)'
    },
    carouselItem: {
        width: screenWidth,
        height: screenHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '85%',
        height: '75%',
        marginBottom: scaleHeight(120),
        borderRadius: 20,
        // opacity:0.7,
        // backgroundColor:'rgba(0, 0, 0, 0.7)'
    },
    overlay: {
        position: 'absolute',
        top: scaleHeight(480),
        left: 20,
        right: 20,
        //alignItems: 'center',
    },
    nameText: {
        fontSize: scaleHeight(20),
        color: '#fff',
        fontFamily: fonts.fontsType.bold,
        left: 30,
        flex: 1,
        top: 10,
        alignSelf: 'center'
    },
    distanceText: {
        fontSize: scaleHeight(14),
        color: '#fff',
        fontFamily: fonts.fontsType.medium,
        left: 30,
        marginBottom: 10,
        //top: -10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: scaleHeight(90),
    },
    iconButton: {
        top: scaleHeight(10)
        // height: scaleHeight(40),
        // width: scaleWidth(40),
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderRadius: scaleWidth(40) / 2,
        // borderWidth: 2,
        // borderColor: '#ff4d4d',

        //backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    iconButton2: {
        padding: 10,
        bottom: scaleHeight(10),
        //borderRadius: 30,
        // borderWidth: 2,
        borderColor: theme.dark.secondary,
        marginHorizontal: 20
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    iconButton3: {
        top: scaleHeight(10)
        // height: scaleHeight(40),
        // width: scaleWidth(40),
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderRadius: scaleWidth(40) / 2,
        // borderWidth: 2,
        // borderColor: '#4da6ff',
        // // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    dotContainer: {
        position: 'absolute',
        top: 55,
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
    },

    detailContainer: {
        padding: 30,
        top: scaleHeight(-140)
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
    gradientOverlay: {
        position: 'absolute',
        bottom: scaleHeight(120),
        left: 0,
        right: 0,
        height: '30%', // Adjust this value as needed
    },
});

export default UserHomeContent;
