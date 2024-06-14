import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Dimensions, View, FlatList, Text, TouchableOpacity, ScrollView, TextInput, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { scaleHeight, scaleWidth } from '../../../../styles/responsive';
import { theme } from '../../../../assets';
import {
    bellHome,
    chatHome,
    disLikeHome,
    disLikeLabel,
    dummy1,
    dummy2,
    dummyImg,
    filterHome,
    homeLogo,
    labelHome,
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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const categories = [
    { id: '1', text: 'Date', image: bellHome },
    { id: '2', text: 'Lunch', image: filterHome },
    { id: '3', text: 'Dinner', image: homeLogo },
    { id: '4', text: 'Movie Night', image: likeHome },
];

const UserHomeContent = () => {
    const lottieRef = useRef(null);
    const navigation = useNavigation();
    const [showCarousel, setShowCarousel] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [min, setMin] = useState(20);
    const [max, setMax] = useState(80);
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [showFilterModal, setFilterModal] = useState(false);

    const scrollOffsetY = useRef(0);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [action, setAction] = useState({ index: null, type: null });
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scaleY = useRef(new Animated.Value(1)).current;
    const rotateZ = useRef(new Animated.Value(0)).current;

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
                // After the animation, remove the image from the list
                images.splice(index, 1);
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0)); // Adjust the active index
                translateX.setValue(0); // Reset the animation value for the next use
                translateY.setValue(0); // Reset the animation value for the next use
                setAction({ index: null, type: null }); // Reset the action
            });
        }, 500);
    };

    const dislike = (index) => {
        setAction({ index, type: 'dislike' });
        setTimeout(() => {

            Animated.timing(rotateZ, {
                toValue: 45,
                duration: 1000,
                useNativeDriver: true,
            }),

                Animated.timing(translateX, {
                    toValue: -screenWidth, // Slide out to the left
                    duration: 1000,
                    useNativeDriver: true,
                }).start(() => {
                    // After the animation, remove the image from the list
                    images.splice(index, 1);
                    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0)); // Adjust the active index
                    translateX.setValue(0); // Reset the animation value for the next use
                    rotateZ.setValue(0);
                    setAction({ index: null, type: null }); // Reset the action
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
                // After the animation, remove the image from the list
                images.splice(index, 1);
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0)); // Adjust the active index
                rotateZ.setValue(0); // Reset the rotation value for the next use
                translateX.setValue(0); // Reset the translation value for the next use
                setAction({ index: null, type: null }); // Reset the action
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
        // This will run once when the component mounts and set the initial scroll position to 0
        scrollOffsetY.current = 0;
    }, []);

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

    const renderItem = ({ item, index }) => (
        <Animated.View style={[styles.carouselItem, {
            transform: [{ translateX }, { translateY }, { scaleY },
            {
                rotateZ: action.index === index && action.type === 'dislike' ? rotateZ.interpolate({
                    inputRange: [0, 45],
                    outputRange: ['0deg', '45deg'],
                }) : '0deg'
            }, // Apply rotation if it's a dislike action
            ]
        }]}>
            <Image source={item} style={styles.carouselImage} resizeMode="cover" />
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

    const onChange = (min, max) => {
        console.log('Max: ', max);
        console.log('Min: ', min);
    };

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

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

                                    }}>Kg</Text>
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

                        <Button title={"Apply"} customStyle={{
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
            return theme.dark.primary;  // Color when scrolling up
        } else if (scrollDirection === 'down') {
            return theme.dark.primary;    // Color when scrolling down
        } else if (scrollOffsetY.current = 0) {
            return '#4C4615';   // Default color
        }
    };

    return (
        <LinearGradient
            colors={[theme.dark.primary, '#4C4615', '#4C4615']}
            locations={[0.19, 0.7, 0.7]}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.container}>
                {/* <View style={{
                    marginTop: scaleHeight(10),
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    <Image source={homeLogo} style={{
                        width: scaleWidth(35),
                        height: scaleHeight(42),
                        alignSelf: 'center',

                    }} />

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



                </View> */}
                {!showCarousel ? (
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
                    </>
                ) : (
                    <ScrollView
                        onScroll={handleScroll}
                        scrollEventThrottle={1}
                        style={[styles.carouselContainer, { backgroundColor: getBackgroundColor() }]}>
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
                                        styles.dot,
                                        { backgroundColor: index === activeIndex ? theme.dark.secondary : 'rgba(17, 17, 17, 1)' },
                                    ]}
                                />
                            ))}
                        </View>

                        <View style={styles.overlay}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.nameText}>Olivia (24)</Text>
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
                            <Text style={styles.distanceText}>5 km away</Text>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    onPress={() => handleDislike(activeIndex)}
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
                                    onPress={() => like(activeIndex)}
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
                                        resetNavigation(navigation, SCREENS.SEND_REQUEST)
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
                                        4.5
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
                                Hi there! I’m Olivia, a 24-year-old graphic designer in NYC.I love all things creative, from my work to cooking and exploring the city’s art scene.
                            </Text>

                            <DetailItem label="Gender" value="Female" />
                            <DetailItem label="Height" value="5'4" />
                            <DetailItem label="Weight" value="50 kg" />
                            <DetailItem label="Hourly Rate" value="$45" />
                            <DetailItem label="Languages" value="English, French, German" />
                            <DetailItem label="Location" value="California, USA" />


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
                                    California, USA
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
                                    categories={categories}
                                    onPress={handleCategoryPress} />

                            </View>

                            <TouchableOpacity onPress={() => {
                                resetNavigation(navigation, SCREENS.IMAGE_VIEWER)
                            }}>
                                <Image style={{
                                    width: '100%',
                                    height: scaleHeight(300),
                                    marginTop: scaleHeight(10),
                                    borderRadius: 10
                                }} source={dummyImg} />
                            </TouchableOpacity>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>

                                <TouchableOpacity onPress={() => {
                                    resetNavigation(navigation, SCREENS.IMAGE_VIEWER)
                                }}>

                                    <Image style={{
                                        width: scaleWidth(150),
                                        height: scaleHeight(230),
                                        marginTop: scaleHeight(10),
                                        borderRadius: 10
                                    }} source={dummy1} />

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    resetNavigation(navigation, SCREENS.IMAGE_VIEWER)
                                }}>
                                    <Image style={{
                                        width: scaleWidth(150),
                                        height: scaleHeight(230),
                                        marginTop: scaleHeight(10),
                                        borderRadius: 10
                                    }} source={dummy2} />

                                </TouchableOpacity>

                            </View>

                            <Button
                                onPress={() => {
                                    resetNavigation(navigation, SCREENS.SEND_REQUEST)
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

                                <Button title={"Report"}
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
                        alert('Hello')
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

                {renderFilterModal()}

            </SafeAreaView>
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
        marginBottom: 10,
        top: -10
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

});

export default UserHomeContent;
