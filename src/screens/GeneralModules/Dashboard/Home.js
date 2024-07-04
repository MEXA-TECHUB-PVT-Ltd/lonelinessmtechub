import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Dimensions, View, FlatList, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import { theme } from '../../../assets';
import {
    bellHome,
    chatHome,
    disLikeHome,
    dummy1,
    dummy2,
    dummyImg,
    filterHome,
    homeLogo,
    labelHome,
    likeHome,
    locationPin,
    lockImg,
    ratingStar,
    sendHome,
    warningImg
} from '../../../assets/images';
import fonts from '../../../styles/fonts';
import { resetNavigation } from '../../../utils/resetNavigation';
import { SCREENS } from '../../../constant/constants';
import DetailItem from '../../../components/DetailItem';
import CategoryList from '../../../components/CategoryList';
import Button from '../../../components/ButtonComponent';
import { color } from '@rneui/base';
import CustomModal from '../../../components/CustomModal';
import Modal from 'react-native-modal';
import HorizontalDivider from '../../../components/HorizontalDivider';
import CustomRangeSlider from '../../../components/CustomSlider';
import CheckBox from '../../../components/CheckboxComponent';
import CustomTextInput from '../../../components/TextInputComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import BuddyHomeContent from './BuddyDashboard/BuddyHomeContent';
import UserHomeContent from './UserDashboard/UserHomeContent';
import { useAuth } from '../../../providers/AuthProvider';
import Spinner from '../../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/AuthModule/signInSlice';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const categories = [
    { id: '1', text: 'Date', image: bellHome },
    { id: '2', text: 'Lunch', image: filterHome },
    { id: '3', text: 'Dinner', image: homeLogo },
    { id: '4', text: 'Movie Night', image: likeHome },
];

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const lottieRef = useRef(null);
    const { role } = useSelector((state) => state.auth);
    // const { isLoggedIn, userRole, logout } = useAuth();
    const [showCarousel, setShowCarousel] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [min, setMin] = useState(20);
    const [max, setMax] = useState(80);
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });

    const [hieghtFtSelected, setHeightFtSelected] = useState(true);
    const [hieghtInSelected, setHeightInSelected] = useState(false);
    const [weightKgSelected, setWeightKgSelected] = useState(true);
    const [weightLbSelected, setWeightLbSelected] = useState(false);

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [showFilterModal, setFilterModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const scrollOffsetY = useRef(0);
    const [scrollDirection, setScrollDirection] = useState(null);

    const handleScroll = (event) => {
        const currentOffsetY = event.nativeEvent.contentOffset.y;
        const direction = currentOffsetY > scrollOffsetY.current ? 'down' : 'up';
        setScrollDirection(direction);
        scrollOffsetY.current = currentOffsetY;
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

    const handleToggleFt = () => {
        setHeightFtSelected(true);
        setHeightInSelected(false);
    };

    const handleToggleInches = () => {
        setHeightFtSelected(false);
        setHeightInSelected(true);
    };

    const handleToggleKg = () => {
        setWeightKgSelected(true);
        setWeightLbSelected(false);
    };

    const handleToggleLb = () => {
        setWeightKgSelected(false);
        setWeightLbSelected(true);
    };

    const images = [
        dummyImg, // Replace with actual image sources
        dummy1,
        dummy2
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            if (lottieRef.current) {
                lottieRef.current.pause();
                setShowCarousel(true);
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const handleCategoryPress = (item) => {
        console.log('Category pressed:', item);
    };

    // const renderItem = ({ item }) => (

    //     <View style={styles.carouselItem}>
    //         <Image source={item} style={[styles.carouselImage]} resizeMode="cover" />
    //     </View>
    // );

    const renderItem = ({ item }) => (
        <View style={styles.carouselItem}>
            <Image source={item} style={styles.carouselImage} resizeMode="cover" />
        </View>
    );

    const onChange = (min, max) => {
        setMin(min)
        setMax(Math.round(max))
        console.log('Max: ', max);
        console.log('Min: ', min);
    };

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    let loaderTimeout;

    // Function to set loader to true
    function setLoaderTrue() {
        setLoader(true); // Replace setLoader with your actual function to set loader state
        loaderTimeout = setTimeout(setLoaderFalse, 3000); // Set timeout for 3 seconds
    }

    // Function to set loader to false
    function setLoaderFalse() {
        setLoader(false); // Replace setLoader with your actual function to set loader state
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

                <ScrollView style={{
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
                            <CheckBox label={"Men"} labelStyle={{
                                color: theme.dark.inputBackground,
                                fontFamily: fonts.fontsType.semiBold,
                                fontSize: scaleHeight(15),
                            }} />
                            <CheckBox label={"Women"} labelStyle={{
                                color: theme.dark.inputBackground,
                                fontFamily: fonts.fontsType.semiBold,
                                fontSize: scaleHeight(15),
                            }} />
                            <CheckBox label={"Other"} labelStyle={{
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
                        <CheckBox label={"Top liked Profiles"} labelStyle={{
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
                        <CheckBox label={"Top Rated Profiles"} labelStyle={{
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
                        identifier={'password'}
                        value={form.password}
                        onValueChange={(value) => handleChange('password', value)}
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
                                        handleToggleFt();
                                    }}
                                    style={{
                                        backgroundColor: hieghtFtSelected ? theme.dark.secondary : '#333333',
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
                                        color: hieghtFtSelected ? theme.dark.black : theme.dark.white,
                                        alignSelf: 'center'

                                    }}>Ft</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        handleToggleInches();
                                    }}
                                    style={{
                                        backgroundColor: hieghtInSelected ? theme.dark.secondary : '#333333',
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
                                        color: hieghtInSelected ? theme.dark.black : theme.dark.white,
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
                        identifier={'password'}
                        value={form.password}
                        onValueChange={(value) => handleChange('password', value)}
                        mainContainer={{ marginTop: 10 }}
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

                    <CustomTextInput
                        label={'Language'}
                        placeholder={"Select Language"}
                        identifier={'password'}
                        value={form.password}
                        onValueChange={(value) => handleChange('password', value)}
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

                        <Button title={"Reset"}
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
                                setLoaderTrue();
                                setFilterModal(false)
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

    // console.log('scrollDirection',scrollDirection)

    const getBackgroundColor = () => {
        if (scrollDirection === 'up') {
            return '#4C4615';  // Color when scrolling up
        } else if (scrollDirection === 'down') {
            return theme.dark.primary;    // Color when scrolling down
        } else {
            return '#4C4615';   // Default color
        }
    };


    return (


        <SafeAreaView style={styles.container}>

            <View style={{
                marginTop: scaleHeight(10),
                flexDirection: 'row',
                justifyContent: 'space-evenly',
            }}>
                <TouchableOpacity onPress={() => {
                    dispatch(logout())
                }}>
                    <Image source={homeLogo} style={{
                        width: scaleWidth(35),
                        height: scaleHeight(42),
                        alignSelf: 'center',

                    }} />
                </TouchableOpacity>

                <Image source={labelHome} style={{
                    width: scaleWidth(130),
                    height: scaleHeight(27),
                    alignSelf: 'center',

                }} />

                <TouchableOpacity style={{
                    justifyContent: 'center'
                }} onPress={() => {
                    resetNavigation(navigation, SCREENS.NOTIFICATION)
                }}>
                    <Image source={bellHome} style={{
                        width: scaleWidth(27),
                        height: scaleHeight(27),
                        alignSelf: 'center',
                        right: scaleWidth(-20),

                    }} />
                </TouchableOpacity>

                <TouchableOpacity style={{
                    justifyContent: 'center'
                }} onPress={() => {
                    setFilterModal(true)
                }}>
                    <Image source={filterHome} style={{
                        width: scaleWidth(27),
                        height: scaleHeight(27),
                        alignSelf: 'center',

                    }} />
                </TouchableOpacity>

            </View>

            {
                loader ? <Spinner
                    label={`Please wait... ${'\n'}We are applying filtering the list`}
                    lottieCustomStyle={{
                        width: scaleWidth(150),
                        height: scaleHeight(150),
                    }}
                /> : (role === 'Buddy Finder' ? <UserHomeContent /> : <BuddyHomeContent />)
            }



            {renderFilterModal()}

        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.dark.primary
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
    imageCircle: {
        width: scaleWidth(118), // Ensure this matches the height scaling for a perfect circle
        height: scaleWidth(118), // Use scaleWidth to keep the dimensions consistent
        borderRadius: scaleWidth(118) / 2, // Half of the width/height to make it a circle
        borderWidth: 4,
        borderColor: theme.dark.secondary,
        alignSelf: 'center',
        position: 'absolute',
        top: scaleHeight(340),
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
        fontSize: scaleHeight(24),
        color: '#fff',
        fontFamily: fonts.fontsType.bold,
        left: 30,
        flex: 1,
        top: 10
    },
    distanceText: {
        fontSize: scaleHeight(14),
        color: '#fff',
        fontFamily: fonts.fontsType.medium,
        left: 30,
        marginBottom: 20
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: scaleHeight(90),
    },
    iconButton: {
        top: scaleHeight(15)
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
        //borderRadius: 30,
        // borderWidth: 2,
        borderColor: theme.dark.secondary,
        marginHorizontal: 20
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    iconButton3: {
        top: scaleHeight(15)
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
    }

});

export default Home;
