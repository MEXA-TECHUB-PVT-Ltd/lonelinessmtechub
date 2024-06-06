import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Dimensions, View, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-elements';
import { scaleHeight, scaleWidth } from '../../../styles/responsive';
import { theme } from '../../../assets';
import { bellHome, chatHome, disLikeHome, dummyImg, filterHome, homeLogo, labelHome, likeHome, onboardingLogo, screen1, screen2, screen3, sendHome } from '../../../assets/images';
import fonts from '../../../styles/fonts';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Home = () => {
    const lottieRef = useRef(null);
    const [showCarousel, setShowCarousel] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [
        dummyImg, // Replace with actual image sources
        dummyImg,
        dummyImg
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

    const renderItem = ({ item }) => (

        <View style={styles.carouselItem}>

            <Image source={item} style={[styles.carouselImage]} resizeMode="cover" />

            <View style={styles.overlay}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.nameText}>Olivia (24)</Text>
                    <Image source={chatHome} style={{
                        width: scaleWidth(50),
                        height: scaleHeight(50),
                        alignSelf: 'center',
                        marginEnd:20
                        //right: scaleWidth(-20),

                    }} />
                </View>
                <Text style={styles.distanceText}>5 km away</Text>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.iconButton}>
                        {/* <Icon name="close" type="material" color="#ff4d4d" /> */}
                        <Image source={disLikeHome} style={{
                            width: scaleWidth(40),
                            height: scaleHeight(40),
                            alignSelf: 'center',
                            //right: scaleWidth(-20),

                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton2}>
                        {/* <Icon name="favorite" type="material" color={theme.dark.secondary} /> */}
                        <Image source={likeHome}
                            resizeMode='contain'
                            style={{
                                width: scaleWidth(45),
                                height: scaleHeight(45),
                                alignSelf: 'center',
                                //right: scaleWidth(-20),

                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton3}>
                        {/* <Icon name="send" type="material" color="#4da6ff" /> */}
                        <Image source={sendHome} style={{
                            width: scaleWidth(40),
                            height: scaleHeight(40),
                            alignSelf: 'center',
                            //right: scaleWidth(-20),

                        }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <LinearGradient
            colors={['black', 'rgba(252, 226, 32, 0.7)']}
            locations={[0.19, 0.7]}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: scaleHeight(10), flexDirection: 'row', justifyContent: 'space-evenly' }}>
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

                    <Image source={bellHome} style={{
                        width: scaleWidth(27),
                        height: scaleHeight(27),
                        alignSelf: 'center',
                        right: scaleWidth(-20),

                    }} />

                    <Image source={filterHome} style={{
                        width: scaleWidth(27),
                        height: scaleHeight(27),
                        alignSelf: 'center',

                    }} />

                </View>
                {!showCarousel ? (
                    <>
                        <LottieView
                            ref={lottieRef}
                            style={styles.lottieView}
                            source={require('../../../assets/ripple_lottie.json')}
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
                    <ScrollView style={styles.carouselContainer}>
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

                        <Image
                            resizeMode='contain'
                            source={screen1} style={{
                                width: '95%',
                                //height: scaleHeight(27),
                                alignSelf: 'center',
                                marginTop: scaleHeight(-220),
                                marginBottom: scaleHeight(-40)

                            }} />

                        <Image
                            resizeMode='contain'
                            source={screen2} style={{
                                width: '95%',
                                //height: scaleHeight(27),
                                alignSelf: 'center',
                                marginTop: scaleHeight(-250),
                                marginBottom: scaleHeight(-50)

                            }} />


                        <Image
                            resizeMode='contain'
                            source={screen3} style={{
                                width: '95%',
                                //height: scaleHeight(27),
                                alignSelf: 'center',
                                marginTop: scaleHeight(-100)

                            }} />


                    </ScrollView>
                )}
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
        top: scaleHeight(312),
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
        backgroundColor: 'rgba(17, 17, 17, 1)'
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
        bottom: 80,
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
        top:10
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
        height: scaleHeight(40),
        width: scaleWidth(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scaleWidth(40) / 2,
        borderWidth: 2,
        borderColor: '#ff4d4d',

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
        height: scaleHeight(40),
        width: scaleWidth(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scaleWidth(40) / 2,
        borderWidth: 2,
        borderColor: '#4da6ff',
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
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

});

export default Home;
